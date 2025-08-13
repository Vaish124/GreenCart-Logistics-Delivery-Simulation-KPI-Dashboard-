import React, { useState } from 'react';

function Simulation() {
  const [numberOfDrivers, setNumberOfDrivers] = useState(2);
  const [routeStartTime, setRouteStartTime] = useState('09:00');
  const [maxHoursPerDriver, setMaxHoursPerDriver] = useState(8);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must log in before running simulation.');
        return;
      }

      const res = await fetch('http://localhost:4000/api/simulation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          numberOfDrivers: Number(numberOfDrivers),
          routeStartTime,
          maxHoursPerDriver: Number(maxHoursPerDriver)
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || 'Failed to run simulation');
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Error running simulation', err);
      setError('Error connecting to server.');
    }
  };

  return (
    <div>
      <h2>Run Simulation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Number of drivers:</label>
          <input
            type="number"
            value={numberOfDrivers}
            onChange={(e) => setNumberOfDrivers(e.target.value)}
          />
        </div>
        <div>
          <label>Route start time:</label>
          <input
            type="time"
            value={routeStartTime}
            onChange={(e) => setRouteStartTime(e.target.value)}
          />
        </div>
        <div>
          <label>Max hours per driver/day:</label>
          <input
            type="number"
            value={maxHoursPerDriver}
            onChange={(e) => setMaxHoursPerDriver(e.target.value)}
          />
        </div>
        <button type="submit">Run Simulation</button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {result && (
        <div>
          <h3>Simulation ran successfully.</h3>
          <p>Total Profit: ₹{result?.totalProfit ?? '0.00'}</p>
          <p>Efficiency: {result?.efficiency ?? '0.00'}%</p>

          {result.orders && result.orders.length > 0 && (
            <table border="1" cellPadding="5">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Driver</th>
                  <th>Route</th>
                  <th>Delivered (min)</th>
                  <th>Late</th>
                  <th>Penalty</th>
                  <th>Bonus</th>
                  <th>Fuel Cost</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                {result.orders.map((order, idx) => (
                  <tr key={idx}>
                    <td>{order.order_id}</td>
                    <td>{order.assigned_driver}</td>
                    <td>{order.route}</td>
                    <td>{order.delivered_minutes}</td>
                    <td>{order.late ? 'Yes' : 'No'}</td>
                    <td>₹{order.penalty}</td>
                    <td>₹{order.bonus}</td>
                    <td>₹{order.fuelCost}</td>
                    <td>₹{order.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Simulation;
