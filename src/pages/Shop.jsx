import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, Grid, Pagination  } from '@mui/material';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../Css/shop.css'; 
import { getProducts } from '../api/apiService'; 
import { getCategories } from '../api/categoryService'; 
import { addToCart } from '../api/cartService';
import { placeOrder } from '../api/orderService';
import { useNavigate } from 'react-router-dom';


const id= localStorage.getItem('userId');
const handleAddToCart = async(cartData) => {

  const res = await addToCart(cartData);

  if(res.status !== 200){
    toast.error("Error adding to cart!");
    return;
  }

  toast.success("Added to cart!");
};

const handelDirectBuy = async(productId) => {
  await handleAddToCart({
    productId: productId,
    userId: id,
    quantity: 1,
  });
  await placeOrder(id);
  toast.success("Order placed successfully!");
}



const Shop = () => {
  // const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategory, setFilteredCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true); 
  const [errorProducts, setErrorProducts] = useState(null);
  const [errorCategories, setErrorCategories] = useState(null); 
  const [pageNumber, setPageNumber] = useState(1);  
  const [maxPage, setMaxPage] = useState(1);  
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(filteredCategory, pageNumber, 6);
          setProducts(response.data);
          setMaxPage(response.maxPage);
          setLoadingProducts(false);
      } catch (error) {
        setErrorProducts("Failed to fetch products");
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, [pageNumber, filteredCategory]);  //searchTerm 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories(); 
        setCategories(data); 
        setLoadingCategories(false);
      } catch (error) {
        setErrorCategories('Failed to fetch categories');
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);


  const handleCategoryClick = (category) => {
    setFilteredCategory(category.categoryId);
  };



  const handlePageChange = (event, value) => {
    setPageNumber(value);  
  };


  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  }

  if (loadingProducts || loadingCategories) {
    return <div>Loading...</div>; 
  }

  if (errorProducts) {
    return <div>{errorProducts}</div>; 
  }

  if (errorCategories) {
    return <div>{errorCategories}</div>; 
  }

  return (
    <div className="shop-container">
      <div className="sidebar">
       
        
        <div className="categories">
          <h3>Categories</h3>
          <Button
              fullWidth
              variant="outlined"
              onClick={() => setFilteredCategory("")}
              style={{ marginBottom: '8px' }}
            >
              All Products
          </Button>
          {categories.filter(c=>c.categoryId!==4).map((category) => (
            <Button
              key={category.categoryId}
              fullWidth
              variant="outlined"
              onClick={() => handleCategoryClick(category)}
              style={{ marginBottom: '8px' }}
            >
              {category.categoryName}
            </Button>
          ))}
        </div>
      </div>

      <div className="product-list">
        <Grid container spacing={2}>
          {products.map((product) => (
            
            <Grid item xs={12} sm={6} md={4} key={product.productId}>
              <Card>
                <div 
                  style={{display: "flex", justifyContent:"center", alignItems:"center"}}
                  onClick={()=>{handleProductClick(product.productId)}}
                >
                
                <img src={product.imageUrl} alt={product.productName} style={{height:"250px", objectFit: 'cover' }} />
                </div>
                <CardContent>
                  <Typography variant="h6">{product.productName}</Typography>
                  <Typography variant="body1">${product.price}</Typography>
                  
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
                     onClick={() => {handelDirectBuy(product.productId)} }
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div style={{display: "flex", justifyContent:"center", alignItems:"center", marginTop:"20px"}}>
       
        <Pagination 
          count={maxPage}  
          page={pageNumber} 
          onChange={handlePageChange} 
        />
      </div>
      </div>
    </div>
  );
};

export default Shop;













