import React, { useEffect, useState } from "react";
import "../Css/Cart.css";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { getCart, deleteCartItem } from "../api/cartService";


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() =>{
    const getData = async() =>{
    const cartData = await getCart(32); 
    setCartItems(cartData)
    }
    getData()
  },[])

  const handleRemoveItem = async (cartItemId) => {
    try {
      
      await deleteCartItem(cartItemId);

      
      const updatedCart = cartItems.filter((item) => item.cartItemId !== cartItemId);
      setCartItems(updatedCart); 

      toast.success("Item removed successfully.");
    } catch (error) {
      console.error("Failed to delete cart item:", error);
      toast.error("Failed to delete item.");
    }
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
          <div className="cart-row" key={item.cartItemId}>
            <div className="cart-item-title" >
              <IconButton
                onClick={() => handleRemoveItem(item.cartItemId)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
              <img
                src={item.product.imageUrl}
                alt={item.name}
                className="cart-image"
              />
              <span>{item.product.productName}</span>
            </div>
            <div className="cart-item">${item.product.price.toFixed(2)}</div>
            <div className="cart-item">{item.quantity}</div>
            <div className="cart-item">${item.totalAmount.toFixed(2)}</div>
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
