// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5001/auth',
// //   baseURL: ' https://bubblebliss.onrender.com/auth',
// });

// export const logoutUser = async (token) => {
//   try {
//     const response = await API.post('/logout', {}, {
//       headers: {
//         Authorization: `Bearer ${token}`  // Send the token in the Authorization header
//       }
//     });
//     return response.data; // Return response from the backend
//   } catch (error) {
//     console.error('Logout error:', error);
//     throw error;  // Throw error if something goes wrong
//   }
// };

// services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: ' https://bubblebliss.onrender.com', // Change if your backend runs elsewhere
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const registerUser = async (data) => {
  return await API.post('/auth/register', data);
};

export const loginUser = async (data) => {
  return await API.post('/auth/login', data);
};

export const logoutUser = async (token) => {
  return await API.post('/auth/logout', null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Protected Route Example
export const getProtectedData = async (token) => {
  return await API.get('/auth/protected-route', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createOrder = async (orderData) => {
    return await API.post('/payment/createOrder', orderData);
  };
  
  export const verifyPayment = async (paymentData) => {
    return await API.post('/payment/verifyPayment', paymentData);
  };
