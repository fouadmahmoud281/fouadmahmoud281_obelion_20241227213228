import React, { useState, useEffect } from 'react';
import './HomePage.css';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    color: '',
    brand: '',
    type: '',
    sort: 'newest',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://ecommerceapp-backend.cloud-stacks.com/api/products', {
          params: filters,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="homepage">
      <header className="header">
        <img src="company_logo_url" alt="Company Logo" className="logo" />
        <nav className="nav-tabs">
          <a href="#electronics" className="nav-item">Electronics</a>
          <a href="#fashion" className="nav-item">Fashion</a>
          <a href="#home" className="nav-item">Home</a>
          <a href="#beauty" className="nav-item">Beauty</a>
        </nav>
      </header>
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="color">Color</label>
          <select id="color" value={filters.color} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="orange">Orange</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="brand">Brand</label>
          <select id="brand" value={filters.brand} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="brandA">Brand A</option>
            <option value="brandB">Brand B</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="type">Type</label>
          <select id="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
          </select>
        </div>
        <div className="sort">
          <label htmlFor="sort">Sort by</label>
          <select id="sort" value={filters.sort} onChange={handleFilterChange}>
            <option value="price">Price</option>
            <option value="newest">Newest</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div>
      <div className="product-catalog">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <h2>{product.name}</h2>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
      <footer className="footer">
        <div className="footer-links">
          <a href="#contact">Contact Us</a>
          <a href="#about">About Us</a>
          <a href="#faqs">FAQs</a>
        </div>
        <button className="checkout-button">Proceed to Checkout</button>
      </footer>
    </div>
  );
};

export default HomePage;