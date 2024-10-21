import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Something Went Wrong!</h1>
      <p>We are working on fixing the issue.</p>
      <Link to="/home">Go back to Home</Link>
    </div>
  );
};

export default Error;
