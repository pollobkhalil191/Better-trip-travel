"use client";

import { useEffect, useState, useRef } from "react"; // Add useRef here
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { fetchHomePageData } from "../../services/homePageService";  // Adjust the path as needed

export default function Destination() {
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null); // This initializes the useRef hook

  useEffect(() => {
    const fetchDestinations = async () => {
      const data = await fetchHomePageData();

      if (data) {
        const locations =
          data.data.find((item) => item.type === "list_locations")?.model?.data || [];

        const destinationsWithTourCount = await Promise.all(
          locations.map(async (location) => {
            const toursResponse = await fetch(
              `https://btt.triumphdigital.co.th/api/tour/search?location_id=${location.id}`
            );
            const toursData = await toursResponse.json();
            return {
              id: location.id,
              title: location.title,
              image: location.image,
              tourCount: toursData.data.length || 0,
            };
          })
        );
        setDestinations(destinationsWithTourCount);
      } else {
        setError("Failed to fetch destinations data.");
      }
    };

    fetchDestinations();
  }, []);

  const handleSlider = (direction) => {
    const cardWidth = 180;
    const visibleCards = window.innerWidth <= 768 ? 2 : 6;
    const totalCards = destinations.length;
    const container = sliderRef.current;

    if (!container) return;

    if (direction === "right" && currentIndex + visibleCards < totalCards) {
      setCurrentIndex(currentIndex + visibleCards);
      container.scrollTo({
        left: (currentIndex + visibleCards) * cardWidth,
        behavior: "smooth",
      });
    } else if (direction === "left" && currentIndex > 0) {
      setCurrentIndex(currentIndex - visibleCards);
      container.scrollTo({
        left: (currentIndex - visibleCards) * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const visibleDestinations = destinations.slice(
    currentIndex,
    currentIndex + (window.innerWidth <= 768 ? 2 : 6)
  );

  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-10 px-5 lg:px-20">
      <h2 className="text-2xl font-bold text-left mb-6">
        Awe-inspiring destinations around the world
      </h2>
      <div className="relative">
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scroll-smooth transition-transform duration-500 ease-in-out"
        >
          {visibleDestinations.map((destination) => (
            <Link
              key={destination.id}
              href={`/Tours?location_id=${destination.id}`}
              title={`Explore tours for ${destination.title}`}
              aria-label={`Explore tours for ${destination.title}`}
            >
              <div className="relative flex-shrink-0 w-[180px] h-[220px] overflow-hidden rounded-lg group cursor-pointer">
                <Image
                  src={destination.image}
                  alt={`Image of ${destination.title}`}
                  width={180}
                  height={200}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                  <h3 className="text-white text-sm font-bold text-left">
                    {destination.title}
                  </h3>
                  <p className="text-white text-xs text-left">
                    {destination.tourCount} tours available
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* Left Arrow */}
        <button
          onClick={() => handleSlider("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white -ml-4 p-2 rounded-full shadow-lg"
        >
          <IoIosArrowBack size={24} />
        </button>
        {/* Right Arrow */}
        <button
          onClick={() => handleSlider("right")}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
        >
          <IoIosArrowForward size={24} />
        </button>
      </div>
    </section>
  );
}
