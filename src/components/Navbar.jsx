import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { colors } from "@mui/material";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("userId")!== null);
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("userId")!== null);
  }, [localStorage]);
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>EARTH STORE</h1>
      </div>
      <div className="navbar-right">
        <ul>
          <li>
            <NavLink
              style={(e) => {
                return {
                  color: e.isActive === true ? "#4169E1" : "",
                };
              }}
              to="/home"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              style={(e) => {
                return {
                  color: e.isActive === true ? "#4169E1" : "",
                };
              }}
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              style={(e) => {
                return {
                  color: e.isActive === true ? "#4169E1" : "",
                };
              }}
              to="/shop"
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              style={(e) => {
                return {
                  color: e.isActive === true ? "#4169E1" : "",
                };
              }}
              to="/contact"
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              style={(e) => {
                return {
                  color: e.isActive === true ? "#4169E1" : "",
                };
              }}
              to="/cart"
            >
              Cart
            </NavLink>
          </li>

          <li>
            <NavLink
              style={(e) => {
                return {
                  color: e.isActive === true ? "#4169E1" : "",
                };
              }}
              to="/order"
            >
              Orders
            </NavLink>
          </li>

          {isLoggedIn ? (
            <li>
              <NavLink
                style={(e) => {
                  return {
                    color: e.isActive === true ? "#4169E1" : "",
                  };
                }}
                to="/Logout"
              >
                Logout
              </NavLink>
            </li>
          ) : (
            !isLoggedIn && (
              <li>
                <NavLink
                  style={(e) => {
                    return {
                      color: e.isActive === true ? "#4169E1" : "",
                    };
                  }}
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
