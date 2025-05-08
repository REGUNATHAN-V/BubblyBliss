import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';

export const store = configureStore({
  reducer: {
    user:userReducer,
    wishlist:wishlistReducer,
    cart: cartReducer,
  },
});
