import React, { useState, useEffect } from 'react';
import './ProductCatalog.css';
import axios from 'axios';

const ProductCatalog = () => {
  const [category, setCategory] = useState('all');
  const [filters, setFilters] = useState({ color: '', brand: '', type: '' });
  const [sort, setSort] = useState('newest');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://ecommerceapp-backend.cloud-stacks.com/api/products', {
          params: {
            category,
            color: filters.color,
            brand: filters.brand,
            type: filters.type,
            sort,
          },
        });
        setProducts(response.data);
      } catch (error) {
        setError('Failed to fetch products');
      }
    };
    fetchProducts();
  }, [category, filters, sort]);

  const handleCategoryChange = (newCategory) => setCategory(newCategory);
  const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const handleSortChange = (e) => setSort(e.target.value);

  return (
    <div className="product-catalog">
      <header className="header">
        <img src="your-logo-url" alt="Company Logo" className="logo" />
        <nav className="navigation">
          <button onClick={() => handleCategoryChange('all')}>All</button>
          <button onClick={() => handleCategoryChange('electronics')}>Electronics</button>
          <button onClick={() => handleCategoryChange('fashion')}>Fashion</button>
        </nav>
      </header>

      <div className="filters">
        <input
          type="text"
          placeholder="Color"
          name="color"
          value={filters.color}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          placeholder="Brand"
          name="brand"
          value={filters.brand}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          placeholder="Type"
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
        />
        <select value={sort} onChange={handleSortChange}>
          <option value="newest">Newest</option>
          <option value="price">Price</option>
          <option value="popular">Popular</option>
        </select>
      </div>

      <div className="product-list">
        {error && <div className="error">{error}</div>}
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <p>{product.color}</p>
            <p>{product.brand}</p>
            <p>{product.type}</p>
          </div>
        ))}
      </div>

      <footer className="footer">
        <div className="additional-links">
          <a href="#contact">Contact Us</a>
          <a href="#about">About Us</a>
          <a href="#faqs">FAQs</a>
        </div>
      </footer>
    </div>
  );
};

export default ProductCatalog;