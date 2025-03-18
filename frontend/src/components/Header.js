import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isAuthenticated, username, onLogout }) => {
  return (
    <header>
      <div className="logo">
        <Link to="/" className="logo-link">
          Papilio <span>Figures</span>
        </Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Figures</Link></li>
          <li><Link to="/wishlist">Wishlist</Link></li>
          <li><Link to="/collection">Collection</Link></li>
          <li><Link to="/search">Search</Link></li>
        </ul>
      </nav>
      {isAuthenticated ? (
        <div className="header-right">
	      <Link to="/login" onClick={onLogout} className="login-button">
		    {username}
	      </Link>
        </div>
      ) : (
        <div className="header-right">
          <Link to="/login" className="login-button">Login</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
