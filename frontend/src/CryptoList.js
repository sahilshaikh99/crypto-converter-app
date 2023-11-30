import React from 'react';

const Cryptolist = () => {
  const cryptoCurrencies = [
    { value: 'BTC', label: 'Bitcoin' },
    { value: 'ETH', label: 'Ethereum' },
    { value: 'DOGE', label: 'Dogecoin' },
    { value: 'XRP', label: 'Ripple' },
    { value: 'LTC', label: 'Litecoin' },
    { value: 'BCH', label: 'Bitcoin Cash' },
    { value: 'ADA', label: 'Cardano' },
    { value: 'DOT', label: 'Polkadot' },
    { value: 'XLM', label: 'Stellar' },
  ];

  return (
    <>
      {cryptoCurrencies.map((crypto) => (
        <option key={crypto.value} value={crypto.value}>
          {crypto.label}
        </option>
      ))}
    </>
  );
};

export default Cryptolist;
