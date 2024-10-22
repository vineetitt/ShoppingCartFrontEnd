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
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderPage from './pages/Orders';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Logout from './pages/Logout';
import NotFound from './pages/UnauthorizedPage';
import Error from './pages/Error';
import ErrorBoundary from './pages/ErrorBoundary';  
import Signup from './pages/SignUp';

function App() {
  const id = localStorage.getItem('userId');
  const [isLoggedIn, setIsLoggedIn] = useState(id!== null);
  
  return (
    <div className="app-container">
      <Router>
        <Navbar isLoggedIn={isLoggedIn}/>
        <div className="main-content">
          <ErrorBoundary> 
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product/:productId" element={<ProductPage />} />

              
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
              <Route
                path="/order"
                element={
                  <PrivateRoute>
                    <OrderPage userId={id} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/shop"
                element={
                  <PrivateRoute>
                    <Shop />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login setIsLoggedIn= {setIsLoggedIn} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Logout setIsLoggedIn= {setIsLoggedIn} />} />
              <Route path="*" element={<NotFound />} /> 
              <Route path="/error" element={<Error />} />
            </Routes>
          </ErrorBoundary>
        </div>
        {/* <Footer /> */}
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
