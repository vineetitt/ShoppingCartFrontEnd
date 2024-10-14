import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { getProducts } from '../api/apiService';

const products = [
  {
    id: 1,
    image: "https://via.placeholder.com/300x200",
    title: "Product 1",
    description: "This is a detailed description of Product 1.",
    price: "$49.99"
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300x200",
    title: "Product 2",
    description: "This is a detailed description of Product 2.",
    price: "$69.99"
  },
  {
    id: 3,
    image: "https://via.placeholder.com/300x200",
    title: "Product 3",
    description: "This is a detailed description of Product 3.",
    price: "$89.99"
  }
];

const ProductPage = () => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

 
  const handleBuyNow = () => {
   
    toast.success('Order Placed Successfully!', {
      position: "top-right",
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
     
      <ToastContainer />

      <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center' }}>
        {product.title}
      </Typography>

      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
       
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ width: '300px', height: '200px', borderRadius: '10px' }} 
        />

        
        <div>
          <Typography variant="body1" style={{ marginBottom: '10px' }}>
            {product.description}
          </Typography>

          <Typography variant="h6" color="textSecondary">
            Price: {product.price}
          </Typography>

          
          <Button 
            variant="contained" 
            color="primary" 
            style={{ marginTop: '20px' }} 
            onClick={handleBuyNow}
          >
            Confirm Buy
          </Button>
        </div>
      </div>

      
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="outlined" color="secondary" href="/">
          Go Back to Home
        </Button>
      </div>
    </div>
  );
};

export default ProductPage;
