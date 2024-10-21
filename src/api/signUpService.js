import axios from 'axios';

const handleSignupform = async (username, email, password) => {
  try {
    const response = await axios.post('https://localhost:7178/api/Authentication/signup', {
      username: username,
      email: email,
      PasswordHash: password,
    });
    return response;
  } 
  catch (error) {
    throw error;
  }
};

export default handleSignupform;
