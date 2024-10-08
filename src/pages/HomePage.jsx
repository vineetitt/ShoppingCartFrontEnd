// src/pages/Home.js
import React from 'react';
import '../Css/home.css'; 
import { Button } from '@mui/material';
import { green } from '@mui/material/colors';

const Home = () => {
  return (
    <div>
      {/* Hero section */}
      <div className="home-container">
        <div className="content">
          <h1>Store</h1>
          <Button  
            color="success" 
            size="large" 
            href='./Shop' 
            variant="contained"
            sx={{
              bgcolor: green[500],
              fontSize: "1rem",
            }} 
          >
            Shop Now
          </Button>
        </div>
      </div>

      {/* Product Section */}
      <div className="product-section">
        <h2>Featured Products</h2>
        <div className="products-container">
          
          <div className="product-card">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Product 1"
              className="product-image"
            />
            <h3 className="product-title">Product 1</h3>
            <p className="product-description">
              This is a short description of the product. It highlights key features.
            </p>
            <p className="product-price">$49.99</p>
            <Button variant="contained" className="buy-button">Buy Now</Button>
          </div>

          
          <div className="product-card">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Product 2"
              className="product-image"
            />
            <h3 className="product-title">Product 2</h3>
            <p className="product-description">
              This is a short description of the product. It highlights key features.
            </p>
            <p className="product-price">$69.99</p>
            <Button variant="contained" className="buy-button">Buy Now</Button>
          </div>

         
          <div className="product-card">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Product 3"
              className="product-image"
            />
            <h3 className="product-title">Product 3</h3>
            <p className="product-description">
              This is a short description of the product. It highlights key features.
            </p>
            <p className="product-price">$89.99</p>
            <Button variant="contained" className="buy-button">Buy Now</Button>
          </div>
        </div>
      </div>


      <div className="testimonial-section">
        <h2>What Our Customers Say</h2>

        <div className="testimonial-container">
          <div className="testimonial-card"> 
            <img 
            src="https://via.placeholder.com/50" 
            alt="Customer 1" 
            className='customer-image'
            />
            <p>"This product changed my life! Highly recommend."</p>
            <h4>- John Doe</h4>
          </div>

          <div className="testimonial-card"> {/* Testimonial card for each testimonial */}
            <img
              src="https://via.placeholder.com/50" // Placeholder for customer image
              alt="Customer 2"
              className="customer-image" // Added class for styling the image
            />
            <p>"Great quality and fast shipping. Will buy again!"</p>
            <h4>- Jane Smith</h4>
          </div>

          <div className="testimonial-card">
            <img 
            src="https://via.placeholder.com/50"
            alt="Customer 3" 
            className="customer-image"  // Added class for styling the image
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
