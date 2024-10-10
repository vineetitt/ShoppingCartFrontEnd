import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';  // If you're using MUI button

const ProductCard = ({ image, title, description, price, productId }) => {
  const navigate = useNavigate();

  const handleBuyNowClick = () => {
    // Navigate to product detail page when the button is clicked
    navigate(`/product/${productId}`);
  };

  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <h3 className="product-title">{title}</h3>
      <p className="product-description">{description}</p>
      <p className="product-price">{price}</p>

      {/* Button that navigates to the product details page */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleBuyNowClick}
        className="buy-button"
      >
        Buy Now
      </Button>
    </div>
  );
};

export default ProductCard;
