import axios from 'axios';


export const handleLogin =  async (Username, Password)=>{
    try{
        const response = await axios.post('https://localhost:7178/api/Authentication/login',{
            username: Username,
            password: Password
        });

        return response.data;
    }
    catch (error) {
        console.error("Error placing order", error);
        throw error;
    }
}