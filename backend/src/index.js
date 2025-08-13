const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/kpi', async (req, res) => {
  try {
    const kpiData = {
      totalOrders: 15,
      onTimePercent: 0,
      totalProfit: 720.59,
      totalFuelCost: 371.72,
      avgDeliveryTime: 53.4,
      topDriver: 'Driver 2'
    };
    res.json(kpiData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch KPI data' });
  }
});

app.post('/api/simulation', async (req, res) => {
  try {
    const { numberOfDrivers, routeStartTime, maxHoursPerDriver } = req.body;

    const orders = [
      {
        order_id: 'ORD001',
        assigned_driver: 'Driver 1',
        route: 'Route A',
        delivered_minutes: 45,
        late: false,
        penalty: 0,
        bonus: 10,
        fuelCost: 50,
        profit: 100
      }
    ];

    const totalProfit = orders.reduce((sum, o) => sum + o.profit, 0);
    const efficiency = (orders.filter(o => !o.late).length / orders.length) * 100;

    res.json({
      totalProfit: totalProfit.toFixed(2),
      efficiency: efficiency.toFixed(2),
      orders
    });
  } catch (error) {
    res.status(500).json({ error: 'Simulation failed' });
  }
});

app.get('/', (req, res) => {
  res.send('Backend API is running...');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
