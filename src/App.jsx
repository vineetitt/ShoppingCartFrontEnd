import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import About from './pages/About';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from './api/cartService';

function App() {
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:productId" element={<ProductPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
