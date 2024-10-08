// src/pages/Cart.js
import React, { useState } from 'react';
import '../Css/Cart.css';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      imageUrl: "https://via.placeholder.com/100x100",
      productName: "Product 1",
      price: 49.99,
      quantity: 1,
      subtotal: 49.99,
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/100x100",
      productName: "Product 2",
      price: 69.99,
      quantity: 2,
      subtotal: 139.98,
    },
  ]);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart); 
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      
      <div className="cart-header">
        <div className="header-item">Product</div>
        <div className="header-item">Price</div>
        <div className="header-item">Quantity</div>
        <div className="header-item">Subtotal</div>
      </div>

      {cartItems.map((item) => (
        <div className="cart-row" key={item.id}>
          <div className="cart-item">
            <IconButton onClick={() => handleRemoveItem(item.id)} color="error">
              <DeleteIcon />
            </IconButton>
            <img src={item.imageUrl} alt={item.productName} className="cart-image" />
            <span>{item.productName}</span>
          </div>
          <div className="cart-item">${item.price.toFixed(2)}</div>
          <div className="cart-item">{item.quantity}</div>
          <div className="cart-item">${item.subtotal.toFixed(2)}</div>
        </div>
      ))}

      <div className="cart-actions">
        <Button variant="contained" color="primary">Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;
