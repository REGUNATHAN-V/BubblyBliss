import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, changeQuantity ,clearCart} from '../redux/cartSlice';
import '../css/Cart.css';
import { createOrder, verifyPayment } from '../services/api';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState('Online');
  const [showModal, setShowModal] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [orderMessage, setOrderMessage] = useState('');

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, qty) => {
    dispatch(changeQuantity({ id, quantity: Number(qty) }));
  };

  const total = cart.reduce((sum, item) => {
    const price = Number(item.price);
    const qty = Number(item.quantity);
    return sum + (isNaN(price) || isNaN(qty) ? 0 : price * qty);
  }, 0);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      if (!total || isNaN(total) || total <= 0) {
        alert("Invalid total amount. Cannot proceed with payment.");
        return;
      }

      const { data } = await createOrder({
        amount: total,
        receipt: `receipt_${Date.now()}`
      });

      const order = data.data.order;

      const res = await loadRazorpay();
      if (!res) {
        alert("Razorpay SDK failed to load.");
        return;
      }

      const options = {
        key: 'rzp_test_OXpxyErFZlZzqD',
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Soap Store",
        description: "Soap Purchase",
        handler: async function (response) {
          const verifyRes = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });

// After verifyPayment:
    if (verifyRes.data.success) {
    dispatch(clearCart());
    setOrderMessage(
        `✅ Payment Successful! Your order will be shipped to: "${shippingAddress}" in 3-4 days.\n\n🛒 Thank you for shopping! Would you like to buy another product?`
    );
    }
 else {
            alert("❌ Payment verification failed.");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-details">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">₹ {item.price.toFixed(2)} x {item.quantity}</p>
              </div>
              <div className="cart-actions">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="quantity-input"
                />
                <button className="remove-button" onClick={() => handleRemove(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <p className="total-price">Total: ₹ {total.toFixed(2)}</p>

          <div className="payment-section">
            <label htmlFor="payment-method">Choose Payment Method:</label>
            <select
              id="payment-method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="payment-select"
            >
              <option value="Online">Online</option>
              <option value="cod">Cash on Delivery</option>
            </select>
            <button className="pay-button" onClick={() => setShowModal(true)}>Pay Now</button>
          </div>
        </>
      )}

      {orderMessage && (
        <div className="success-message">
          <p>{orderMessage}</p>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Enter Shipping Address</h3>
            <textarea
              rows="4"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Enter full shipping address..."
            ></textarea>
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                onClick={() => {
                  setShowModal(false);
                  handlePayment();
                }}
                disabled={!shippingAddress.trim()}
              >
                Continue to Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
