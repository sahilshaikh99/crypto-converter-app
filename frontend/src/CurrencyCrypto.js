import React, { useState } from 'react';
import CryptoList from './CryptoList';
import CurrencyList from './CurrencyList';

const CurrencyCrypto = () => {
  const [currency1, setCurrency1] = useState('BTC');
  const [currency2, setCurrency2] = useState('USD');
  const [value1, setValue1] = useState('');
  const [convertedValue, setConvertedValue] = useState('');
  const [error, setError] = useState('');

  const convert = async () => {
    if (currency1 !== '' && currency2 !== '' && value1 !== '') {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_APP_API_URL}/api/convert/currencytocrypto/${currency2}/${currency1}/${value1}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to convert. Please try again.');
        }

        setError('');
        const result = await response.json();
        setConvertedValue(result);
      } catch (error) {
        console.error('Error converting:', error.message);
        setError(error.message || 'Failed to convert. Please try again.');
      }
    } else {
      setError('Please input all fields');
      setConvertedValue('');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Country Currency to Crypto Converter</h1>
      <div className="row">
        <div className="col-md-6">
          <label>Country Currency</label>
          <select className="form-control" value={currency2} onChange={(e) => setCurrency2(e.target.value)}>
            <CurrencyList />
          </select>
          <br />
        </div>
        <div className="col-md-6">
          <label>Crypto Currency</label>
          <select className="form-control" value={currency1} onChange={(e) => setCurrency1(e.target.value)}>
            <CryptoList />
          </select>
          <br />
        </div>
        <div className="col-md-6 mx-auto">
          <label>Quantity</label>
          <input
            type="text"
            className="form-control"
            value={value1}
            placeholder="Enter amount"
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
      <br />
      <div className="text-center">
        {error ? (
          <div style={{ color: 'red', fontSize: '18px' }}>{error}</div>
        ) : convertedValue !== '' ? (
          <>
            <div style={{ fontSize: '24px', color: 'green', marginBottom: '15px' }}>
              {value1} {currency2} value in {currency1} is {convertedValue.amountOfCrypto}
            </div>
            <small>Data last updated on: {convertedValue.lastUpdated}</small>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default CurrencyCrypto;
