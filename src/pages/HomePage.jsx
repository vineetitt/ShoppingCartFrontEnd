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

      <div className="product-section">
        <h2>Featured Products</h2>
        <div className="products-container">
          <ProductCard 
            image="https://via.placeholder.com/300x200" 
            title="Product 1" 
            description="This is a short description of the product. It highlights key features." 
            price="$49.99" 
            productId={1}  
          />
          
          <ProductCard 
            image="https://via.placeholder.com/300x200" 
            title="Product 2" 
            description="This is a short description of the product. It highlights key features." 
            price="$69.99" 
            productId={2}  
          />

          <ProductCard 
            image="https://via.placeholder.com/300x200" 
            title="Product 3" 
            description="This is a short description of the product. It highlights key features." 
            price="$89.99" 
            productId={3}  
          />
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

          <div className="testimonial-card">
            <img
              src="https://via.placeholder.com/50"
              alt="Customer 2"
              className="customer-image"
            />
            <p>"Great quality and fast shipping. Will buy again!"</p>
            <h4>- Jane Smith</h4>
          </div>

          <div className="testimonial-card">
            <img 
              src="https://via.placeholder.com/50"
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
