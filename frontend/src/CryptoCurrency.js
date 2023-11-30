// CryptoCurrency.js
import React, { useState } from 'react';
import CryptoList from './CryptoList';
import CurrencyList from './CurrencyList';

const CryptoCurrency = () => {
  const [currency1, setCurrency1] = useState('BTC');
  const [currency2, setCurrency2] = useState('USD');
  const [value1, setValue1] = useState('');
  const [convertedValue, setConvertedValue] = useState('');
  const [error, setError] = useState('');

  const convert = async () => {
    if (currency1 !== '' && currency2 !== '' && value1 !== '') {
      try {
        const response = await fetch(`http://localhost:5500/api/convert/cryptotocurrency/${currency1}/${currency2}/${value1}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }

        setError('');
        const result = await response.json();
        setConvertedValue(result);
      } catch (error) {
        //console.error('Error converting:', error);
        setError(error.message || 'Failed to convert. Please try again.');
      }
    } else {
      setError('Please input all fields');
      setConvertedValue('');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Crypto to Country Currency Converter</h1>
      <div className="row">
        <div className="col-md-6">
          <label>Crypto Currency</label>
          <select className="form-control" value={currency1} onChange={(e) => setCurrency1(e.target.value)}>
            <CryptoList/>
          </select>
          <br />
        </div>
        <div className="col-md-6">
          <label>Country Currency</label>
          <select className="form-control" value={currency2} onChange={(e) => setCurrency2(e.target.value)}>
            <CurrencyList/>
          </select>
          <br />
          </div>
          <div className="col-md-6 mx-auto">
            <label>Quantity</label>
            <input
              type="text"
              className="form-control"
              value={value1}
              placeholder='Enter amount'
              onChange={(e) => setValue1(e.target.value)}
            />
        </div>
      </div>
      <br />
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary mx-auto" onClick={convert}>
          Convert
        </button>
      </div>
      <br/>
      <div className="text-center">
        {error ? (
          <div style={{ color: 'red', fontSize: '18px' }}>{error}</div>
        ) : convertedValue !== '' ? (
          <>
            <div style={{ fontSize: '24px', color: 'green', marginBottom: '15px' }}>
              {value1} {currency1} value in {currency2} is {convertedValue.amount}
            </div>
            <small style={{ color: 'blue' }}>Data last updated on: {convertedValue.lastUpdated}</small>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default CryptoCurrency;
