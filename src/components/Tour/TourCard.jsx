'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Next.js Link for navigation
import { fetchToursByLocation } from '../../services/tourService'; // API service function
import { FaHeart } from 'react-icons/fa'; // Import Font Awesome Heart Icon

const TourCard = ({ location_id }) => {
  const [tours, setTours] = useState([]); // State to store list of tours
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const data = await fetchToursByLocation(location_id); // Fetch data using the service
        if (data.data.length > 0) {
          setTours(data.data); // Set all tours in state
        } else {
          setError('No tours available for this location');
        }
      } catch (err) {
        setError('Failed to fetch tour data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours(); // Fetch tours on component mount
  }, [location_id]);

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>{error}</div>; // Show error message

  if (tours.length === 0) return null; // If no tours are found, return nothing

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-16 gap-6">
      {tours.map((tour) => (
        <Link href={`/tours/${tour.id}`} key={tour.id}> {/* Wrap the tour card with Link */}
          <div
            className="tour-card bg-white shadow-sm rounded-lg overflow-hidden transform transition-transform duration-300 ease-in-out border relative"
          >
            {/* Wishlist Icon */}
            <div className="absolute top-2 right-2 z-10 rounded-full p-2 shadow-md cursor-pointer">
              <FaHeart className="text-white hover:text-red-500 transition duration-200" size={20} />
            </div>

            {/* Image */}
            <div className="relative w-full h-[200px] overflow-hidden">
              <Image
                src={tour.image}
                alt={tour.title}
                width={500}
                height={200}
                className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>

            {/* Tour Info */}
            <div className="p-4">
              {/* Location */}
              <p className="text-sm font-medium text-gray-500">{tour.location?.name || 'Unknown Location'}</p>

              {/* Title */}
              <h3 className="text-xl font-semibold">{tour.title}</h3>

              {/* Duration */}
              <p className="text-gray-600 mt-2">{tour.duration}</p>

              {/* Reviews */}
              <div className="mt-2 flex items-center">
                <span className="text-yellow-500">{'★'.repeat(Math.round(tour.review_score.score_total))}</span>
                <span className="ml-1 text-gray-500">({tour.review_score.total_review} reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-2 items-center">
                <p className="text-sm text-gray-400 line-through">{`$${tour.price}`}</p>
                <p className="text-lg font-bold text-textPrimary">
                  From {`$${tour.sale_price}`} <span className="text-sm">per person</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TourCard;
