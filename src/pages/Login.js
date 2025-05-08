import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { setName } from '../redux/userSlice'; 
import { loginUser } from '../services/api';
import '../css/Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [form, setForm] = useState({ fullName: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      console.log("res", res);
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token); 
        localStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
        dispatch(setName(form.fullName));
        navigate('/');
      } 
      else {
        setMessage('Invalid credentials');
      }
    } catch (err) {
      setMessage('Login failed');
    }
  };



  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        {message && <p className="error-message">{message}</p>}
        <div className='below'>
        <p> Don't have an account ? <Link to="/register" className="link">Register</Link></p>

        </div>
      </div>
      
    </div>
  );
};

export default Login;