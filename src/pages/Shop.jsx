import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, Grid, Pagination } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../Css/shop.css'; 
import { getProducts } from '../api/apiService'; 
import { getCategories } from '../api/categoryService'; 
import { addToCart } from '../api/cartService';

const handleAddToCart = async(cartData) => {
  const res = await addToCart(cartData);

  if(res.status !== 200){
    toast.error("Error adding to cart!");
    return;
  }

  toast.success("Added to cart!");
};

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategory, setFilteredCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true); 
  const [errorProducts, setErrorProducts] = useState(null);
  const [errorCategories, setErrorCategories] = useState(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoadingProducts(false);
      } catch (error) {
        setErrorProducts('Failed to fetch products');
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setFilteredCategory(category.categoryId);
  };

  const handleBuyNow = (productName) => {
    toast.success(`Order placed for ${productName}!`);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filteredCategory ? product.categoryId === filteredCategory : true)
  );

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
        <TextField
          label="Search Products"
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
        />
        
        <div className="categories">
          <h3>Categories</h3>
          {categories.map((category) => (
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
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.productId}>
              <Card>
                <img src="https://via.placeholder.com/150" alt={product.productName} style={{ height: '150px', objectFit: 'cover' }} />
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
                                userId: 32,
                                quantity: 1,
                              })}}
                  >
                    Add to Cart
                  </Button>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleBuyNow(product.productName)}
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      <Pagination count={10}/>
      </div>
    </div>
  );
};

export default Shop;
