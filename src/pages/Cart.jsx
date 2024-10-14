import React from "react";
import "../Css/Cart.css";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const Cart = ({ cartItems, setCartItems }) => {
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);  
  };

  const handleBuyNow = ()=>{
    toast.success("Order placed successfully!");

    setCartItems([]);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      <div className="cart-header">
        <div className="header-item-title">Product</div>
        <div className="header-item">Price</div>
        <div className="header-item">Quantity</div>
        <div className="header-item">Subtotal</div>
      </div>

      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div className="cart-row" key={item.id}>
            <div className="cart-item-title" >
              <IconButton
                onClick={() => handleRemoveItem(item.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
              <img
                src={item.imageUrl}
                alt={item.name}
                className="cart-image"
              />
              <span>{item.name}</span>
            </div>
            <div className="cart-item">${item.price.toFixed(2)}</div>
            <div className="cart-item">{item.quantity}</div>
            <div className="cart-item">${item.subtotal.toFixed(2)}</div>
          </div>
        ))
      ) : (
        <p>Your Cart is empty</p>
      )}

      {cartItems.length > 0 && (
        <div className="cart-actions">
          <Button variant="contained" color="primary" onClick={()=>{
            handleBuyNow()}} >
            Buy Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
