import React, { useState, useEffect } from 'react';
import './AccountManagement.css';
import axios from 'axios';

const AccountManagement = () => {
  const [activeTab, setActiveTab] = useState('personalInfo');
  const [personalInfo, setPersonalInfo] = useState({
    address: '',
    contact: ''
  });
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('https://ecommerceapp-backend.cloud-stacks.com/api/users/1');
        setPersonalInfo({
          address: response.data.address || '',
          contact: response.data.phone || ''
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get('https://ecommerceapp-backend.cloud-stacks.com/api/users/1/orders');
        setOrderHistory(response.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchUserInfo();
    fetchOrderHistory();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const updateAccountInfo = async () => {
    try {
      await axios.put('https://ecommerceapp-backend.cloud-stacks.com/api/users/1', {
        address: personalInfo.address,
        phone: personalInfo.contact
      });
      alert('User information updated successfully');
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <div className="account-management">
      <header className="header">
        <img src="https://agent.obelion.ai/static/images/f4dcb49b-33c8-4ea1-ac46-2dd922813da4.png" alt="Company Logo" className="logo" />
        <nav className="navigation">
          <button style={{ backgroundColor: activeTab === 'personalInfo' ? '#FFAA00' : 'transparent' }} onClick={() => setActiveTab('personalInfo')}>Personal Information</button>
          <button style={{ backgroundColor: activeTab === 'paymentMethods' ? '#FFAA00' : 'transparent' }} onClick={() => setActiveTab('paymentMethods')}>Payment Methods</button>
          <button style={{ backgroundColor: activeTab === 'orderHistory' ? '#FFAA00' : 'transparent' }} onClick={() => setActiveTab('orderHistory')}>Order History</button>
        </nav>
      </header>
      <main className="content">
        {activeTab === 'personalInfo' && (
          <div className="personal-info">
            <h2 style={{ color: '#5555AA', fontFamily: 'Dancing Script' }}>Update Personal Information</h2>
            <input type="text" name="address" value={personalInfo.address} onChange={handleInputChange} placeholder="Address" style={{ backgroundColor: '#66CC66', color: '#5555AA' }} />
            <input type="text" name="contact" value={personalInfo.contact} onChange={handleInputChange} placeholder="Contact" style={{ backgroundColor: '#66CC66', color: '#5555AA' }} />
            <button onClick={updateAccountInfo} style={{ backgroundColor: '#FFAA00' }}>Update</button>
          </div>
        )}
        {activeTab === 'paymentMethods' && (
          <div className="payment-methods">
            <h2 style={{ color: '#5555AA', fontFamily: 'Dancing Script' }}>Manage Payment Methods</h2>
            {/* Payment methods management UI */}
          </div>
        )}
        {activeTab === 'orderHistory' && (
          <div className="order-history">
            <h2 style={{ color: '#5555AA', fontFamily: 'Dancing Script' }}>Order History</h2>
            <ul>
              {orderHistory.map(order => (
                <li key={order.id}>
                  Order ID: {order.id}, Status: {order.status}, Total Amount: {order.totalAmount}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <footer className="footer">
        <a href="/support" style={{ color: '#6666FF' }}>Support</a>
        <a href="/faqs" style={{ color: '#6666FF' }}>FAQs</a>
        <p style={{ color: '#5555AA', fontFamily: 'Dancing Script' }}>Terms of Service | Privacy Policy | ©2023 Company</p>
      </footer>
    </div>
  );
};

export default AccountManagement;