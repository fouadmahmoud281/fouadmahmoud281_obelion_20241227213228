import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CheckoutPage.css';
import axios from 'axios';

function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const applyPromoCode = () => {
    if (promoCode === 'DISCOUNT10') {
      setDiscount(0.1);
    }
  };

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('https://ecommerceapp-backend.cloud-stacks.com/api/orders', {
        fullName: shippingInfo.name,
        address: shippingInfo.address,
        city: shippingInfo.city,
        postalCode: shippingInfo.postalCode,
        country: shippingInfo.country,
        promoCode,
        discount: discount * 100,
        cartItems
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSuccess('Order placed successfully!');
      setCartItems([]);
    } catch (error) {
      setError('An error occurred while placing the order');
    }
  };

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <Link to="/" className="logo">Company Logo</Link>
      </header>
      <nav className="checkout-nav">
        <ul>
          <li className="active">Cart</li>
          <li>Shipping Information</li>
          <li>Payment</li>
        </ul>
      </nav>
      <main className="checkout-main">
        <section className="cart-section">
          <h2>Shopping Cart</h2>
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item.id}>{item.name} - ${item.price}</li>
            ))}
          </ul>
        </section>
        <section className="promo-section">
          <h2>Promo Code</h2>
          <input
            type="text"
            value={promoCode}
            onChange={handlePromoCodeChange}
            placeholder="Enter promo code"
          />
          <button onClick={applyPromoCode}>Apply</button>
          {discount > 0 && <p>Discount Applied: {discount * 100}%</p>}
        </section>
        <section className="shipping-section">
          <h2>Shipping Information</h2>
          <form>
            <label style={{ fontFamily: 'Dancing Script' }}>Name</label>
            <input
              type="text"
              name="name"
              value={shippingInfo.name}
              onChange={handleShippingInfoChange}
            />
            <label style={{ fontFamily: 'Dancing Script' }}>Address</label>
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
              onChange={handleShippingInfoChange}
            />
            <label style={{ fontFamily: 'Dancing Script' }}>City</label>
            <input
              type="text"
              name="city"
              value={shippingInfo.city}
              onChange={handleShippingInfoChange}
            />
            <label style={{ fontFamily: 'Dancing Script' }}>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={shippingInfo.postalCode}
              onChange={handleShippingInfoChange}
            />
            <label style={{ fontFamily: 'Dancing Script' }}>Country</label>
            <input
              type="text"
              name="country"
              value={shippingInfo.country}
              onChange={handleShippingInfoChange}
            />
          </form>
        </section>
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </main>
      <footer className="checkout-footer">
        <Link to="/shop">Continue Shopping</Link>
        <Link to="/terms">Terms and Conditions</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </footer>
    </div>
  );
}

export default CheckoutPage;