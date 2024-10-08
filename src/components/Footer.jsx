import React from 'react'
import "./Footer.css"

const Footer = ()=>{
    return(
    <footer className="footer-container">
        <div className="footer-left">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/shop">Shop</a>
            <a href="/contact">Contact</a>
        </div>

        <div className="footer-center">
            <h1>Store</h1>
        </div>
        <div className="footer-right">
            <p>&copy; {new Date().getFullYear()} EarthStore</p> 
        </div>
    </footer>
    );
};


export default Footer;