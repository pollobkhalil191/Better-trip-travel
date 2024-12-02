'use client'; // Ensures the component is rendered client-side

import React, { useState, useEffect } from 'react';
import { fetchTourDetails } from '../../../services/tourDetails'; // Import the fetchTourDetails function
import Image from 'next/image';

const TourDetails = ({ params }) => {
  const [tour, setTour] = useState(null); // State to store the fetched tour data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Unwrap 'params' using React.use() to get the 'id'
  const { id } = React.use(params);

  useEffect(() => {
    if (id) {
      const getTourDetails = async () => {
        try {
          const data = await fetchTourDetails(id); // Fetch the tour data using the 'id'
          setTour(data.data); // Store the tour data in state
          setLoading(false); // Set loading to false once data is fetched
        } catch (error) {
          setError('Failed to load tour details'); // Set error message
          setLoading(false); // Set loading to false even if there's an error
        }
      };

      getTourDetails();
    }
  }, [id]); // Re-run the effect when 'id' changes

  if (loading) {
    return <div className="text-center py-8">Loading tour details...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  if (!tour) {
    return <div className="text-center py-8">No tour found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{tour.title}</h1>

      {/* Price and Sale Price */}
      <div className="price-section mb-8">
        <p className="text-2xl font-semibold text-gray-800">Price: <span className="text-green-600">${tour.price}</span></p>
        {tour.sale_price && (
          <p className="text-xl font-semibold text-red-600 line-through">Sale Price: ${tour.sale_price}</p>
        )}
        {tour.discount_percent && (
          <p className="text-xl font-semibold text-green-500">Discount: {tour.discount_percent}</p>
        )}
      </div>

      {/* Description */}
      <div className="tour-description mb-8 text-lg text-gray-700 space-y-4">
        <div dangerouslySetInnerHTML={{ __html: tour.content }} />
      </div>

      {/* Location and Address */}
      <div className="location-section mb-8">
        <p className="text-xl font-semibold text-gray-800">Location: {tour.location.name}</p>
        <p className="text-sm text-gray-500">{tour.address}</p>
      </div>

      {/* Gallery Images */}
      <div className="gallery mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tour.gallery.map((image, index) => (
          <div key={index} className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image src={image} alt={`Tour Image ${index + 1}`} layout="fill" objectFit="cover" className="rounded-lg" />
          </div>
        ))}
      </div>

      {/* Video */}
      {tour.video && (
        <div className="video mb-8">
          <iframe
            src={tour.video}
            title="Tour Video"
            width="100%"
            height="400"
            className="rounded-lg"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Extra Price (Optional Add-ons) */}
      {tour.enable_extra_price && tour.extra_price && (
        <div className="extra-price mb-8">
          <h3 className="text-xl font-semibold text-gray-800">Extra Price Options:</h3>
          <div className="space-y-4">
            {tour.extra_price.map((item, index) => (
              <div key={index} className="flex justify-between text-lg text-gray-700">
                <p>{item.name}</p>
                <p className="text-green-600">${item.price} ({item.type})</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Duration */}
      <div className="duration mb-8">
        <p className="text-lg text-gray-700">Duration: {tour.duration}</p>
      </div>

      {/* Review Score */}
      <div className="review-score mb-8">
        <p className="text-lg text-gray-800">Rating: <span className="font-semibold">{tour.review_score.score_text}</span> ({tour.review_score.score_total} stars)</p>
        <div className="review-stats grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {tour.review_score.rate_score && Object.keys(tour.review_score.rate_score).map((key) => (
            <div key={key} className="flex flex-col items-center">
              <p className="font-semibold text-gray-600">{tour.review_score.rate_score[key].title}</p>
              <p>{tour.review_score.rate_score[key].total} reviews</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      {tour.review_lists && (
        <div className="reviews-list mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Customer Reviews</h3>
          {tour.review_lists.data.map((review, index) => (
            <div key={index} className="review p-6 border border-gray-200 rounded-lg shadow-sm mb-6">
              <p className="font-semibold text-lg text-gray-800">{review.author.name}</p>
              <p className="text-gray-600">{review.content}</p>
              <p className="text-sm text-gray-500 mt-2">Rating: {review.rate_number} stars</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TourDetails;
