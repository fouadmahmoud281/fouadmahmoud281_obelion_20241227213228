import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AccountPage.css';

function AccountPage() {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [userId, setUserId] = useState(1); // Example user ID, should be dynamically set

  useEffect(() => {
    axios.get(`https://ecommerceapp-backend.cloud-stacks.com/api/users/${userId}`)
      .then(response => {
        setPersonalInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });

    axios.get(`https://ecommerceapp-backend.cloud-stacks.com/api/users/${userId}/orders`)
      .then(response => {
        setOrderHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching order history:', error);
      });

  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  const updateAccountInfo = () => {
    axios.put(`https://ecommerceapp-backend.cloud-stacks.com/api/users/${userId}`, personalInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      alert('User information updated successfully');
    })
    .catch(error => {
      console.error('Error updating user info:', error);
    });
  };

  return (
    <div className="account-page">
      <header className="header">
        <img src="https://agent.obelion.ai/static/images/f4dcb49b-33c8-4ea1-ac46-2dd922813da4.png" alt="Logo" className="logo" />
        <nav className="navigation">
          <button className="nav-tab">Personal Information</button>
          <button className="nav-tab">Payment Methods</button>
          <button className="nav-tab">Order History</button>
        </nav>
      </header>
      <section className="content">
        <div className="personal-info">
          <h2>Manage Personal Information</h2>
          <input
            type="text"
            name="name"
            value={personalInfo.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="input-field"
          />
          <input
            type="email"
            name="email"
            value={personalInfo.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="input-field"
          />
          <input
            type="text"
            name="phone"
            value={personalInfo.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="input-field"
          />
          <input
            type="text"
            name="address"
            value={personalInfo.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="input-field"
          />
          <button className="update-button" onClick={updateAccountInfo}>Update</button>
        </div>
        <div className="payment-methods">
          <h2>Manage Payment Methods</h2>
          {/* Payment methods management interface */}
        </div>
        <div className="order-history">
          <h2>Order History</h2>
          {orderHistory.map((order, index) => (
            <div key={index} className="order-item">
              <p>Order ID: {order.id}</p>
              <p>Status: {order.status}</p>
              <p>Total Amount: {order.totalAmount}</p>
            </div>
          ))}
        </div>
      </section>
      <footer className="footer">
        <a href="#support" className="footer-link">Support</a>
        <a href="#faq" className="footer-link">FAQ</a>
        <div className="legal">
          <a href="#terms" className="legal-link">Terms of Service</a>
          <a href="#privacy" className="legal-link">Privacy Policy</a>
          <p className="legal-text">&copy; 2023 Company Name</p>
        </div>
      </footer>
    </div>
  );
}

export default AccountPage;