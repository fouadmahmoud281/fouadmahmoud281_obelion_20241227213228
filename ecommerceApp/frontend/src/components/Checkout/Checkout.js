import React, { useState } from 'react';
import './Checkout.css';
import axios from 'axios';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handlePromoCodeApply = () => {
    if (promoCode === "DISCOUNT10") {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckout = async () => {
    try {
      const orderData = {
        ...shippingInfo,
        promoCode,
        discount,
        cartItems
      };

      const response = await axios.post('https://ecommerceapp-backend.cloud-stacks.com/api/orders', orderData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        console.log('Order created successfully', response.data);
      }
    } catch (error) {
      console.error('Error creating order', error.response?.data || error.message);
    }
  };

  return (
    <div className="checkout-container">
      <header className="checkout-header">
        <a href="/" className="logo-link">Company Logo</a>
      </header>
      <nav className="checkout-nav">
        <ul>
          <li className="active-tab">Cart</li>
          <li>Shipping Information</li>
          <li>Payment</li>
        </ul>
      </nav>
      <main className="checkout-main">
        <section className="cart-section">
          {/* Cart items display */}
        </section>
        <section className="promo-section">
          <input 
            type="text" 
            placeholder="Enter Promo Code" 
            value={promoCode} 
            onChange={(e) => setPromoCode(e.target.value)} 
          />
          <button onClick={handlePromoCodeApply}>Apply</button>
          {discount > 0 && <p>Discount Applied: {discount}%</p>}
        </section>
        <section className="shipping-section">
          <h2>Shipping Information</h2>
          <form>
            <label style={{ fontFamily: 'Dancing Script' }}>Full Name</label>
            <input 
              type="text" 
              name="fullName" 
              value={shippingInfo.fullName} 
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
      </main>
      <footer className="checkout-footer">
        <a href="#">Continue Shopping</a>
        <a href="#">Terms and Conditions</a>
        <a href="#">Privacy Policy</a>
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
      </footer>
    </div>
  );
};

export default Checkout;