/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Keep your existing CSS

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">DIRASSATI</div>
      
     
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      
      <div className={`links ${menuOpen ? "active" : ""}`}>
        <Link to="/" className="link">Home</Link>
        <Link to="/gallery" className="link">Gallery</Link>
        <Link to="/pricing" className="link">Pricing</Link>
        <Link to="/contact" className="link">Contact</Link>
      </div>

 
      <div className="auth">
        <Link to="/login" className="Enter">Login</Link>
        <Link to="/signupParent" className="join">JOIN US</Link>
      </div>
    </nav>
  );
};

export default Navbar;
