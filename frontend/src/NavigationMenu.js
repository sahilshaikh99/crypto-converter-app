// NavigationMenu.js
import React from 'react';

const NavigationMenu = ({ onMenuClick }) => {
  const handleMenuClick = (page) => {
    onMenuClick(page);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="navbar-brand" onClick={() => handleMenuClick('CryptoToCurrency')}>
          Converter App
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <div to="/" className="nav-link" onClick={() => handleMenuClick('CryptoToCurrency')}>
              Crypto To Currency Converter
              </div>
            </li>
            <li className="nav-item">
              <div to="/" className="nav-link" onClick={() => handleMenuClick('CurrencyCrypto')}>
                Currency to Crypto Converter
              </div>
            </li>
            <li className="nav-item">
              <div to="/" className="nav-link" onClick={() => handleMenuClick('CryptoToCrypto')}>
                Crypto to Crypto Converter
              </div>
            </li>
            {/* Add more menu items as needed */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
