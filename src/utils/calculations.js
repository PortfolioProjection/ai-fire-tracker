export function calculateProjection(assets, fireNumber, monthlyContribution, years) {
  // Calculate total amount invested to compute weighted average return
  const totalInitial = assets.reduce((sum, asset) => sum + asset.amount, 0);
  // Compute weighted average expected return (percentage)
  const portfolioReturn = totalInitial > 0
    ? assets.reduce((sum, asset) => sum + (asset.amount / totalInitial) * asset.return, 0)
    : 0;

  let value = totalInitial;
  const data = [];
  for (let year = 1; year <= years; year++) {
    // grow current value by weighted return
    value = value * (1 + portfolioReturn / 100) + monthlyContribution * 12;
    data.push({ year, value });
  }
  return data;
}
