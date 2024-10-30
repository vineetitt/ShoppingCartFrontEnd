import axios from 'axios';

export const placeOrder= async (userId) => {
    try {
        const response = await axios.post(`https://localhost:7178/api/Order/${userId}`);
        return response.data;
    } 
    catch (error)
     {
        // console.log(error.response.data);
        
        console.error("Error placing order", error);
        throw error;
     }
 };