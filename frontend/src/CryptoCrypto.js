import React, { useState } from 'react';
import CryptoList from './CryptoList';


const CryptoCrypto = () => {
    const [currency1, setCurrency1] = useState('BTC');
    const [currency2, setCurrency2] = useState('ETH');
    const [value1, setValue1] = useState('');
    const [convertedValue, setConvertedValue] = useState('');
    const [error, setError] = useState('');
  
    const convert = async () => {
      if (currency1 !== '' && currency2 !== '' && value1 !== '') {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_APP_API_URL}/api/convert/cryptotocrypto/${currency1}/${currency2}/${value1}`, {
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
          console.error('Error converting:', error.message);
          setError(error.message);
        }
      } else {
        setError('Please input all fields');
        setConvertedValue('');
      }
    };
  
    return (
      <div className="container mt-5">
        <h1 className="text-center">Crypto to Crypto Currency Converter</h1>
        <div className="row">
        <div className="col-md-6">
            <label>Crypto Currency From</label>
            <select className="form-control" value={currency1} onChange={(e) => setCurrency1(e.target.value)}>
            <CryptoList/>
            </select>
            <br />
        </div>
        <div className="col-md-6">
            <label>Crypto Currency To</label>
            <select className="form-control" value={currency2} onChange={(e) => setCurrency2(e.target.value)}>
            <CryptoList/>
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
        <div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" onClick={convert}>
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
                  {value1} {currency1} value in {currency2} is {convertedValue.amount}
                </div>
                <small style={{ color: 'blue' }}>Data last updated on: {convertedValue.lastUpdated}</small>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default CryptoCrypto;