import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../Css/shop.css'; 
import { getProducts } from '../api/apiService'; // Assume you already have this API service function
import { getCategories } from '../api/categoryService'; // Add this API call for fetching categories

const Shop = ({ handleAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategory, setFilteredCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true); // State for loading categories
  const [errorProducts, setErrorProducts] = useState(null);
  const [errorCategories, setErrorCategories] = useState(null); // State for error in fetching categories

  // Fetch products
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

  // Fetch categories from the backend API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories(); // Call the API function to get categories
        setCategories(data); // Set fetched categories
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
    setFilteredCategory(category.categoryId); // Filter by categoryId now
  };

  const handleBuyNow = (productName) => {
    toast.success(`Order placed for ${productName}!`);
  };

  // Filter products based on search and selected category
  const filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filteredCategory ? product.categoryId === filteredCategory : true)
  );

  if (loadingProducts || loadingCategories) {
    return <div>Loading...</div>; // Show loading while fetching data
  }

  if (errorProducts) {
    return <div>{errorProducts}</div>; // Show error message if fetching products fails
  }

  if (errorCategories) {
    return <div>{errorCategories}</div>; // Show error message if fetching categories fails
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
              {category.categoryName} {/* Show category name from API */}
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
                    onClick={() => handleAddToCart(product)} 
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
      </div>
    </div>
  );
};

export default Shop;
