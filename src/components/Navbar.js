import React from "react";
import { Link } from "react-router-dom";
import '../css//Navbar.css'
import { FaShoppingCart,FaHeart } from 'react-icons/fa';
const Navbar = ({ handleLogout }) => {
  return (
    <><div className="offer"><p>Offer 60% on Hand-made soap</p></div><nav className="navbar">
      <div className="navSection">
        <ul className="navLinks">
          <li><Link to="/" className="link">HOME</Link></li>
          <li><Link to="/bathsoap" className="link">BATHSOAP</Link></li>
          <li><Link to="/collections" className="link">COLLECTIONS</Link></li>
        </ul>
      </div>

      <div className="logoSection">
        <h2 className="logo">BubbleBliss</h2>
      </div>

      <div className="navSection">
        <ul className="navLinks">
        <li className="dropdown">
          <span className="link">PAGES ▾</span>
          <ul className="dropdown-menu">
            <li><Link to="/about" className="dropdown-link">About</Link></li>
            <li><Link to="/faq" className="dropdown-link">FAQ</Link></li>
          </ul>
        </li>
          <li><Link to="/news" className="link">NEWS</Link></li>
          <li><Link to="/contact" className="link">CONTACT</Link></li>
          <li><Link to="/wishlist" className="link"><FaHeart size={20} /></Link></li>
          <li><Link to="/cart" className="link"><FaShoppingCart size={20} /></Link></li>
          <li><button onClick={handleLogout} className="logoutbtn">Logout</button></li>
        </ul>
      </div>
    </nav></>
  
  );  
};

export default Navbar