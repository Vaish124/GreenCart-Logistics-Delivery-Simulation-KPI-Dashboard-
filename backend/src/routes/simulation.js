const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  try {
    const { numberOfDrivers, routeStartTime, maxHoursPerDriver } = req.body;

    // Example calculation — replace with your real simulation logic
    const orders = await pool.query("SELECT * FROM orders");

    let totalProfit = 0;
    let totalFuelCost = 0;

    const processedOrders = orders.rows.map(order => {
      const profit = parseFloat(order.profit || 0);
      const fuelCost = parseFloat(order.fuelcost || 0);

      totalProfit += profit;
      totalFuelCost += fuelCost;

      return {
        order_id: order.order_id,
        assigned_driver: order.assigned_driver || "N/A",
        route: order.route_id || "N/A",
        delivered_minutes: order.delivered_minutes || 0,
        late: order.late || false,
        penalty: order.penalty || 0,
        bonus: order.bonus || 0,
        fuelCost: fuelCost.toFixed(2),
        profit: profit.toFixed(2)
      };
    });

    const efficiency =
      processedOrders.length > 0
        ? ((processedOrders.filter(o => !o.late).length / processedOrders.length) * 100).toFixed(2)
        : "0.00";

    res.json({
      totalProfit: totalProfit.toFixed(2),
      efficiency,
      orders: processedOrders
    });

  } catch (error) {
    console.error("Simulation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
