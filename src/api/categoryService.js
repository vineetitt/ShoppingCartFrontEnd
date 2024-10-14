import axios from 'axios';

const API_URL = 'https://localhost:7178/api'; 

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/Category`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};
