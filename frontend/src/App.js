// App.js
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import React, { useState } from 'react';
import NavigationMenu from './NavigationMenu';
import CryptoCurrency from './CryptoCurrency';
import CurrencyCrypto from './CurrencyCrypto';
import CryptoCrypto from './CryptoCrypto';

const App = () => {
  const [selectedPage, setSelectedPage] = useState('CryptoToCurrency');

  const handleMenuClick = (page) => {
    setSelectedPage(page);
  };

  return (
    <div>
      <NavigationMenu onMenuClick={handleMenuClick} />
      <div className="container mt-3">
        {selectedPage === 'CryptoToCurrency' && <CryptoCurrency />}
        {selectedPage === 'CurrencyCrypto' && <CurrencyCrypto />}
        {selectedPage === 'CryptoToCrypto' && <CryptoCrypto />}
        
        {/* Add more pages as needed */}
      </div>
    </div>
  );
};

export default App;
