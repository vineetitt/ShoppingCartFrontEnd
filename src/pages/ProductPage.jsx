import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { getProducts } from '../api/apiService';
import {getProductById} from '../api/apiService';
import { addToCart } from '../api/cartService';
import { placeOrder } from '../api/orderService';
import AddressForm from './AddressForm';

const id= localStorage.getItem('userId');
const handleAddToCart = async(cartData) => {

  const res = await addToCart(cartData);

  if(res.status !== 200){
    toast.error("Error adding to cart!");
    return;
  }

  toast.success("Added to cart!");
};

const handelDirectBuy = async(productId, navigate) => {
  const addedToCart = await handleAddToCart({
    productId: productId,
    userId: id,
    quantity: 1,
  });
  console.log("hii");
  navigate('/address');
 
  // await placeOrder(id);
  // toast.success("Order placed successfully!");
}


const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId); 
        setProduct(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        if(error.response.status === 404){
          toast.error(error.response.data);
        }
        else{
          setError("Failed to fetch product details");
        }
        
        
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }


  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>

      <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center' }}>
        {product.productName}
      </Typography>

      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
       
        <img 
          src={product.imageUrl} 
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
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    style={{ marginBottom: '8px' }}
                    onClick={() => {handleAddToCart({
                                productId: product.productId,
                                userId: id,
                                quantity: 1,
                              })}}
                  >
                    Add to Cart
                  </Button>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                     onClick={() => {handelDirectBuy(product.productId, navigate)} }
                  >
                    Buy Now
                  </Button>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="outlined" color="secondary" onClick={()=>{navigate(-1)}}>
          Go Back to Home
        </Button>
      </div>
    </div>
  );
};

export default ProductPage;
