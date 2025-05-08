import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { logoutUser } from "../services/api";  

import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Bathsoap from "../pages/Bathsoap";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SoapCollection from "../pages/Collection";
import Footer from '../components/Footer';
import About from '../pages/About';
import Faq from '../pages/Faq';
import NEWS from '../pages/News';
import WISHLIST from '../pages/Wishlist';

// Private Route Component
const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function Mainrouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
  
    if (token) {
      try {
        // Send the token to the backend to blacklist it
        await logoutUser(token);  // Pass the token as a parameter to logoutUser
      } catch (err) {
        console.error("Logout failed:", err.message);
      }
    }
  
    // Clear localStorage and update isAuthenticated
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
  };



  return (
    <>
      <Router>
        {isAuthenticated && <Navbar handleLogout={handleLogout} />}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/" element={
            <PrivateRoute isAuthenticated={isAuthenticated}><Home /></PrivateRoute>
          } />
          <Route path="/bathsoap" element={
            <PrivateRoute isAuthenticated={isAuthenticated}><Bathsoap /></PrivateRoute>
          } />
          <Route path="/collections" element={
            <PrivateRoute isAuthenticated={isAuthenticated}><SoapCollection /></PrivateRoute>
          } />
          <Route path="/product/:id" element={
            <PrivateRoute isAuthenticated={isAuthenticated}><ProductDetails /></PrivateRoute>
          } />
          <Route path="/about" element={
            <PrivateRoute isAuthenticated={isAuthenticated}><About /></PrivateRoute>
          } />
          <Route path="/ faq" element={
            <PrivateRoute isAuthenticated={isAuthenticated}><Faq /></PrivateRoute>
          } />
          <Route path="/news" element={
            <PrivateRoute isAuthenticated={isAuthenticated}><NEWS /></PrivateRoute>
          } />
          <Route path="/contact" element={
            <PrivateRoute isAuthenticated={isAuthenticated}><Contact /></PrivateRoute>
          } />
          <Route path="/wishlist" element={
            <PrivateRoute isAuthenticated={isAuthenticated}><WISHLIST /></PrivateRoute>
          } />
          <Route path="/cart" element={
            <PrivateRoute isAuthenticated={isAuthenticated}><Cart /></PrivateRoute>
          } />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default Mainrouter;
