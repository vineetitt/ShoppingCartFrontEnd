import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';  

const ProductCard = ({ image, title, description, price, productId }) => {
  const navigate = useNavigate();

  const handleBuyNowClick = () => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" style={{objectFit:"contain"}} />
      <h3 className="product-title">{title}</h3>
      <p className="product-description">{description}</p>
      <p className="product-price">{price}</p>

      
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
