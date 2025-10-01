import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PortfolioForm from './components/PortfolioForm.jsx';
import { calculateProjection } from './utils/calculations.js';

export default function App() {
  const [assets, setAssets] = useState([]);
  const [fireNumber, setFireNumber] = useState(1000000);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [years, setYears] = useState(30);

  const handleAddAsset = (asset) => {
    setAssets(prev => [...prev, asset]);
  };

  const projectionData = calculateProjection(assets, fireNumber, monthlyContribution, years);
  const yearsToFire = projectionData.find(d => d.value >= fireNumber)?.year ?? 'N/A';

  return (
    <div className="app">
      <h1>AI FIRE Tracker</h1>
      <PortfolioForm onAddAsset={handleAddAsset} />
      <div className="controls">
        <label>
          FIRE Number:
          <input type="number" value={fireNumber} onChange={e => setFireNumber(Number(e.target.value))} />
        </label>
        <label>
          Monthly Contribution:
          <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(Number(e.target.value))} />
        </label>
        <label>
          Years:
          <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} />
        </label>
      </div>
      <div>
        <h3>Years to FIRE: {yearsToFire}</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={projectionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" />
        </LineChart>
      </ResponsiveContainer>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {projectionData.map(d => (
            <tr key={d.year}>
              <td>{d.year}</td>
              <td>{d.value.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
