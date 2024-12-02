// services/tourService.js
import axios from 'axios';

// Fetch details of a single tour
export const fetchTourDetails = async (tourId) => {
  try {
    const response = await axios.get(`https://btt.triumphdigital.co.th/api/tour/detail/${tourId}`);
    return response.data; // Return the full data object
  } catch (error) {
    console.error('Error fetching tour details:', error);
    throw error;
  }
};

