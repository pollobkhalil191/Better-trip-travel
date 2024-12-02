'use client'; // This ensures the component is rendered client-side

import React, { useState, useEffect } from 'react';
import { fetchTourDetails } from '../../../services/tourDetails'; // Import the fetchTourDetails function

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
          const data = await fetchTourDetails(id); // Pass the 'id' to fetch the tour data
          setTour(data.data); // Store the tour data in state
          setLoading(false); // Set loading to false once data is fetched
        } catch (error) {
          setError('Failed to load tour details'); // Set error message
          setLoading(false); // Set loading to false even if there's an error
        }
      };

      getTourDetails();
    }
  }, [id]); // Re-run the effect when the 'id' changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!tour) {
    return <div>No tour found</div>;
  }

  // Render the tour details
  return (
    <div className="tour-detail-page">
      <h1>{tour.title}</h1>
      <p>{tour.description}</p>
      <p>Price: ${tour.price}</p>
      {/* Render other details like images, reviews, itinerary, etc. */}
    </div>
  );
};

export default TourDetails;
