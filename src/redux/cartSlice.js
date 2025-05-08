import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    changeQuantity: (state, action) => {
      const item = state.find(i => i.id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
    },
    clearCart: () => [] // ✅ New reducer to clear cart
  }
});

export const { addToCart, removeFromCart, changeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: [],
//   reducers: {
//     addToCart: (state, action) => {
//       const existing = state.find(item => item.id === action.payload.id);
//       if (existing) {
//         existing.quantity += 1;
//       } else {
//         state.push({ ...action.payload, quantity: 1 });
//       }
//     },
//     removeFromCart: (state, action) => {
//       return state.filter(item => item.id !== action.payload);
//     },
//     changeQuantity: (state, action) => {
//       const item = state.find(i => i.id === action.payload.id);
//       if (item) item.quantity = action.payload.quantity;
//     },
//   }
// });

// export const { addToCart, removeFromCart, changeQuantity } = cartSlice.actions;
// export default cartSlice.reducer;
