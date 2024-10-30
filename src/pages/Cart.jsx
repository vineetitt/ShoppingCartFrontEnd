import React, { useEffect, useState } from "react";
import "../Css/Cart.css";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { getCart, deleteCartItem, addToCart } from "../api/cartService";
import { placeOrder } from "../api/orderService";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const id = localStorage.getItem("userId");
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const cartData = await getCart(id);

      const updatedCartData = cartData.map((item) => ({
        ...item,
        totalAmount: item.quantity * item.product.price,
      }));
      updatedCartData.forEach((item) =>
        setTotalAmount((prev) => prev + item.quantity * item.product.price)
      );
      setCartItems(updatedCartData);
    };
    getData();
  }, []);

  const handleCartQuantityChange = async (cartData) => {
    const res = await addToCart(cartData);

    if (res.status !== 200) {
      toast.error("Error adding to cart!");
      return;
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await deleteCartItem(cartItemId);
      const updatedCart = cartItems.filter(
        (item) => item.cartItemId !== cartItemId
      );
      setTotalAmount(0);
      updatedCart.forEach((item) =>
        setTotalAmount((prev) => prev + item.quantity * item.product.price)
      );
      setCartItems(updatedCart);
      toast.success("Item removed successfully.");
    } catch (error) {
      console.error("Failed to delete cart item:", error);
      toast.error("Failed to delete item.");
    }
  };

  const handleQuantityChange = (cartItemId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.cartItemId === cartItemId) {
        const updatedQuantity = newQuantity < 1 ? 1 : newQuantity;
        const updatedTotalAmount = updatedQuantity * item.product.price;
        return {
          ...item,
          quantity: updatedQuantity,
          totalAmount: updatedTotalAmount,
        };
      }
      return item;
    });

    setTotalAmount(0);
    updatedCartItems.forEach((item) =>
      setTotalAmount((prev) => prev + item.quantity * item.product.price)
    );
    setCartItems(updatedCartItems);
  };

  const handleBuyNow = async (userId) => {
    try {
      navigate("/address");
    } catch (error) {
      toast.error(error.response.data);
    }
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
            <div className="cart-item-title">
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
            <div className="cart-item ">
              <button
                onClick={async () => {
                  handleQuantityChange(item.cartItemId, item.quantity - 1);
                  await handleCartQuantityChange({
                    productId: item.product.productId,
                    userId: id,
                    quantity: -1,
                  });
                }}
                disabled={item.quantity <= 1}
                style={{ marginRight: "10px" }}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={async () => {
                  handleQuantityChange(item.cartItemId, item.quantity + 1);
                  await handleCartQuantityChange({
                    productId: item.product.productId,
                    userId: id,
                    quantity: 1,
                  });
                }}
                disabled={item.quantity >= item.product.stockQuantity}
                style={{ marginLeft: "10px" }}
              >
                +
              </button>
            </div>
            <div className="cart-item">${item.totalAmount.toFixed(2)}</div>
          </div>
        ))
      ) : (
        <p>Your Cart is empty</p>
      )}
      <div className="cart-header">
        <div className="header-item-title"></div>
        <div className="header-item"></div>
        <div className="header-item">Total Amount</div>
        <div className="header-item">{totalAmount}</div>
      </div>
      {cartItems.length > 0 && (
        <div className="cart-actions">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleBuyNow(id)}
          >
            Buy Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
