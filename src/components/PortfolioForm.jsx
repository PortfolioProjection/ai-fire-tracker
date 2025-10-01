import React, { useState } from 'react';

function PortfolioForm({ onAddAsset }) {
  const [asset, setAsset] = useState({ ticker: '', amount: '', returnRate: '' });

  const handleChange = (e) => {
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!asset.ticker || !asset.amount || !asset.returnRate) return;
    onAddAsset({
      ticker: asset.ticker,
      amount: parseFloat(asset.amount),
      return: parseFloat(asset.returnRate),
    });
    setAsset({ ticker: '', amount: '', returnRate: '' });
  };

  return (
    <div>
      <h3>Add Asset</h3>
      <div>
        <label>
          Ticker:
          <input type="text" name="ticker" value={asset.ticker} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input type="number" name="amount" value={asset.amount} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Expected return (%):
          <input type="number" name="returnRate" value={asset.returnRate} onChange={handleChange} />
        </label>
      </div>
      <button type="button" onClick={handleAdd}>Add Asset</button>
    </div>
  );
}

export default PortfolioForm;
