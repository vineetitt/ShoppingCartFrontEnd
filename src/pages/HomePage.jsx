import React from 'react';
import { Button } from '@mui/material';
import ProductCard from '../components/ProductCard'; 
import '../Css/home.css'; 

const Home = () => {
  return (
    <div>
      <div className="home-container">
        <div className="content">
          <h1>Store</h1>
          <Button  
            color="success" 
            size="large" 
            href='./Shop' 
            variant="contained"
          >
            Shop Now
          </Button>
        </div>
      </div>

      <div className="testimonial-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-container">
          <div className="testimonial-card"> 
            <img 
              src="https://static.vecteezy.com/system/resources/previews/014/194/215/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg" 
              alt="Customer 1" 
              className='customer-image'
            />
            <p>"This product changed my life! Highly recommend."</p>
            <h4>- Hillary Doe</h4>
          </div>

          <div className="testimonial-card">
            <img
              src="https://th.bing.com/th/id/OIP.jQvFuRlmVesA7K6ArjfyrAHaH9?rs=1&pid=ImgDetMain"
              alt="Customer 2"
              className="customer-image"
            />
            <p>"Great quality and fast shipping. Will buy again!"</p>
            <h4>- Jane Smith</h4>
          </div>

          <div className="testimonial-card">
            <img 
              src="https://th.bing.com/th/id/R.b544146a8e95908f097fe86343f9140b?rik=jX7vw4SGwprkmQ&riu=http%3a%2f%2fgetdrawings.com%2ffree-icon%2fhuman-icon-png-68.png&ehk=6%2fQzY0BOQSjQjQezTPTHGr%2fZ7zGlyHnCLtaD9hyBwKs%3d&risl=&pid=ImgRaw&r=0"
              alt="Customer 3"
              className="customer-image"
            />
            <p>"Excellent customer service and fantastic products."</p>
            <h4>- Sam Wilson</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
