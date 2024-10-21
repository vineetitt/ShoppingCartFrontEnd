import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');      
    if (token) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      toast.success('You have successfully logged out!');
    }
    else {
      toast.info('You were already logged out!');
    }
    navigate('/login');
  }, []);

  return (
    <div>
      <h2>Logging out...</h2>
      <p>You will be redirected shortly.</p>
    </div>
  );
};

export default Logout;
