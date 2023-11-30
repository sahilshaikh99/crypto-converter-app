import React from 'react';

const CurrencyList = () => {
  return (
    <>
      <option value="USD">US Dollar</option>
      <option value="GBP">Pound Sterling</option>
      <option value="EUR">Euro</option>
      <option value="JPY">Japanese Yen</option>
      <option value="AUD">Australian Dollar</option>
      <option value="CAD">Canadian Dollar</option>
      <option value="CHF">Swiss Franc</option>
      <option value="CNY">Chinese Yuan</option>
      <option value="SEK">Swedish Krona</option>
      {/* Add more currency options as needed */}
    </>
  );
};

export default CurrencyList;
