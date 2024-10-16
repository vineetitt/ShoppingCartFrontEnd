
import React from 'react';
import { Link , NavLink} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>EARTH STORE</h1>
      </div>
      <div className="navbar-right">
        <ul>
          <li>
            <NavLink style={(e)=>{
            return{
               color: e.isActive===true? "#4169E1": ""
            }
           
          }} to="/">Home</NavLink></li>
          <li><NavLink style={(e)=>{
            return{
              color: e.isActive===true? "#4169E1": ""
            }
          }} to="/about">About</NavLink></li>
          <li><NavLink style={(e)=>{
            return{
              color: e.isActive===true? "#4169E1": ""
            }
          }} to="/shop">Shop</NavLink></li>
          <li><NavLink style={(e)=>{
            return{
              color: e.isActive===true? "#4169E1": ""
            }
          }} to="/contact">Contact</NavLink></li>
          <li><NavLink style={(e)=>{
            return{
              color: e.isActive===true? "#4169E1": ""
            }
          }} to="/cart">Cart</NavLink></li>


          <li><NavLink style={(e)=>{
            return{
              color: e.isActive===true? "#4169E1": ""
            }
          }} to="/order">Orders</NavLink></li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
