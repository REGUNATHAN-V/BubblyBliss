import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/wishlistSlice';
import '../css/Wishlist.css';

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div className="wishlist-card" key={item.id}>
              <img src={item.image} alt={item.name} className="wishlist-img" />
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
