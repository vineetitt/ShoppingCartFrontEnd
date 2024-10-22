import axios from 'axios';

const API_URL = 'https://localhost:7178/api'; 

export const getProducts = async (categoryId, pageNumber = 1, pageSize = 6) => {
  try {
    const response = await axios.get(`${API_URL}/Product`, {
      params: {
        categoryId,
        pageNumber,
        pageSize
      }
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};


export const getProductById = async (productId)=>{
  try{
    const response = await axios.get(`${API_URL}/Product/${productId}`);
    return response.data;
  }
  catch(error){
    console.error("Error fetching product by id", error);
    throw error;
  }
}

