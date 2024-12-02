import axios from 'axios';

export const fetchToursByLocation = async (location_id) => {
  try {
    const response = await axios.get(`https://btt.triumphdigital.co.th/api/tour/search?location_id=${location_id}`);
    return response.data; // Return the full data object
  } catch (error) {
    console.error('Error fetching tours:', error);
    throw error; // Throw the error to handle it in the component
  }
};


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