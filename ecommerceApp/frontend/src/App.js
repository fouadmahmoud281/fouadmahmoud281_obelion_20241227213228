jsx
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import ProductCatalog from './components/ProductCatalog/ProductCatalog.js';
import AccountManagement from './components/AccountManagement/AccountManagement.js';
import Checkout from './components/Checkout/Checkout.js';
import Login from './components/Login/Login.js';
import Registration from './components/Registration/Registration.js';

const AuthContext = createContext();

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Navigate to="/catalog" /> : children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <nav style={{ padding: '10px', backgroundColor: '#f8f9fa' }} role="navigation">
          <Link to="/catalog" style={{ marginRight: '10px' }}>Catalog</Link>
          {isAuthenticated ? (
            <>
              <Link to="/account" style={{ marginRight: '10px' }}>Account</Link>
              <Link to="/checkout" style={{ marginRight: '10px' }}>Checkout</Link>
              <button onClick={logout} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
        <main style={{ flex: '1' }}>
          <Routes>
            <Route path="/login" element={
              <PublicRoute>
                <Login onLoginSuccess={login} />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <Registration />
              </PublicRoute>
            } />
            <Route path="/catalog" element={<ProductCatalog />} />
            <Route path="/account" element={
              <ProtectedRoute>
                <AccountManagement />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/catalog" />} />
          </Routes>
        </main>
        <footer style={{ padding: '10px', backgroundColor: '#f8f9fa', textAlign: 'center' }}>
          &copy; 2024 e-commerce App. All rights reserved.
        </footer>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
