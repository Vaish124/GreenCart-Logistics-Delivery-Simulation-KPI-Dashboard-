const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalOrdersRes = await pool.query(`SELECT COUNT(*) FROM orders`);
    const totalOrders = parseInt(totalOrdersRes.rows[0].count, 10);

    const onTimeRes = await pool.query(`SELECT COUNT(*) FROM orders WHERE late = false`);
    const onTimeOrders = parseInt(onTimeRes.rows[0].count, 10);

    const totalProfitRes = await pool.query(`SELECT SUM(profit) FROM orders`);
    const totalProfit = parseFloat(totalProfitRes.rows[0].sum || 0);

    const totalFuelCostRes = await pool.query(`SELECT SUM(fuelcost) FROM orders`);
    const totalFuelCost = parseFloat(totalFuelCostRes.rows[0].sum || 0);

    const avgDeliveryTimeRes = await pool.query(`SELECT AVG(delivered_minutes) FROM orders`);
    const avgDeliveryTime = parseFloat(avgDeliveryTimeRes.rows[0].avg || 0);

    const topDriverRes = await pool.query(`
      SELECT assigned_driver, COUNT(*) as deliveries
      FROM orders
      GROUP BY assigned_driver
      ORDER BY deliveries DESC
      LIMIT 1
    `);
    const topDriver = topDriverRes.rows[0]?.assigned_driver || "N/A";

    const onTimeDeliveryPercent =
      totalOrders > 0 ? ((onTimeOrders / totalOrders) * 100).toFixed(2) : "0.00";

    res.json({
      totalOrders,
      onTimeDelivery: onTimeDeliveryPercent,
      totalProfit: totalProfit.toFixed(2),
      totalFuelCost: totalFuelCost.toFixed(2),
      avgDeliveryTime: avgDeliveryTime.toFixed(1),
      topDriver,
    });
  } catch (err) {
    console.error("KPI error:", err);
    res.status(500).json({ error: "Failed to fetch KPI data" });
  }
});

module.exports = router;
