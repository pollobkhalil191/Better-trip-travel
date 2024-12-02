// components/DestinationSection.tsx
import { FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image"; // Import Image component from Next.js

const DestinationSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold">Popular Destinations</h2>
        <p className="text-lg mt-4">Explore top destinations around the world.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/assets/destination1.jpg" // Image source
              alt="Destination 1"
              width={500} // Width of the image
              height={350} // Height of the image
              className="w-full h-56 object-cover" // Tailwind class for styling
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Paris, France</h3>
              <p className="text-gray-600 mt-2">Discover the city of lights, culture, and art.</p>
              <div className="flex items-center gap-2 mt-4 text-gray-500">
                <FaMapMarkerAlt />
                <span>Paris, France</span>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/assets/destination2.jpg"
              alt="Destination 2"
              width={500}
              height={350}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Tokyo, Japan</h3>
              <p className="text-gray-600 mt-2">Experience the perfect blend of tradition and modernity.</p>
              <div className="flex items-center gap-2 mt-4 text-gray-500">
                <FaMapMarkerAlt />
                <span>Tokyo, Japan</span>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/assets/destination3.jpg"
              alt="Destination 3"
              width={500}
              height={350}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Cape Town, South Africa</h3>
              <p className="text-gray-600 mt-2">Explore stunning beaches and majestic mountains.</p>
              <div className="flex items-center gap-2 mt-4 text-gray-500">
                <FaMapMarkerAlt />
                <span>Cape Town, South Africa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationSection;
