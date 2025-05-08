import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import '../css//Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-logo">Soap Store</h3>
          <p className="footer-description">
            The best store for handmade soaps. Discover our exclusive range of soap products made with natural ingredients.
          </p>
        </div>
        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/home">Home</a></li>
            <li><a href="/bathsoap">Shop</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4 className="footer-title">Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Soap Store. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
