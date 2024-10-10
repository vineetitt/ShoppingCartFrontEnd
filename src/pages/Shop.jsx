// src/pages/Shop.js
import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Grid } from '@mui/material';
import '../Css/shop.css'; 

const categories = ["Electronics", "Clothing", "Books", "Home Appliances"];

const products = [
  { id: 1, name: "Smartphone", price: "$599", category: "Electronics", imageUrl: "https://via.placeholder.com/150" },
  { id: 2, name: "T-Shirt", price: "$19", category: "Clothing", imageUrl: "https://via.placeholder.com/150" },
  { id: 3, name: "Novel", price: "$9.99", category: "Books", imageUrl: "https://via.placeholder.com/150" },
  { id: 4, name: "Microwave", price: "$99", category: "Home Appliances", imageUrl: "https://via.placeholder.com/150" },
];

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategory, setFilteredCategory] = useState('');

  const handleSearch = (e) => {   
    setSearchTerm(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setFilteredCategory(category);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filteredCategory ? product.category === filteredCategory : true)
  );

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
              key={category}
              fullWidth
              variant="outlined"
              onClick={() => handleCategoryClick(category)}
              style={{ marginBottom: '8px' }}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="product-list">
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <img src={product.imageUrl} alt={product.name} style={{ height: '150px', objectFit: 'cover' }} />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body1">{product.price}</Typography>
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
