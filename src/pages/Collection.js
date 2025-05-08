// src/components/SoapCollection.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import '../css/Collection.css';
import { addToWishlist } from '../redux/wishlistSlice';

const soaps = [
  {
    id: 1,
    name: 'Lavender Bliss',
    price: 99,
    image: 'https://lavenderbubbles.com/wp-content/uploads/2023/10/IMG-20231102-WA0010-e1698898035856.jpg',
  },
  {
    id: 2,
    name: 'Lemon Zest',
    price:149,
    image: 'https://i.pinimg.com/736x/66/73/e8/6673e814c9da96b890f21b2188a21f7a.jpg',
  },
  {
    id: 3,
    name: 'Mint Fresh',
    price: 99,
    image: 'https://th.bing.com/th/id/OIP.wy4vJHmSwKSO8AQUnJL-awHaF_?cb=iwc1&w=1000&h=809&rs=1&pid=ImgDetMain',
  },
];

const SoapCollection = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (soap) => {
    dispatch(addToCart(soap));
  };

  return (
    <div className="collection-grid">
      {soaps.map((soap) => (
        <div key={soap.id} className="soap-card">
          <img src={soap.image} alt={soap.name} className="soap-image" />
          <div className="soap-details">
            <h3 className="soap-name">{soap.name}</h3>
            <p className="soap-price">₹ {soap.price.toFixed(2)}</p>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(soap)}>
              Add to Cart
            </button>
            <button  className="add-to-wish-btn" onClick={() => dispatch(addToWishlist(soap))}>
            ❤️ Add to Wishlist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SoapCollection;
