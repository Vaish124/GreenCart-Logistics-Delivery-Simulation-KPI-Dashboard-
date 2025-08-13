const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://your-netlify-site.netlify.app" // change to your actual Netlify frontend URL
    ],
    credentials: true,
  })
);

// Sample KPI route
app.get("/api/kpi", (req, res) => {
  res.json({
    totalOrders: 15,
    onTimePercent: 90,
    totalProfit: 720.59,
    totalFuelCost: 371.72,
    avgDeliveryTime: 53.4,
    topDriver: "Driver 2",
  });
});

// Sample Simulation route
app.post("/api/simulation", (req, res) => {
  res.json({
    totalProfit: 720.59,
    efficiency: 85.2,
    orders: [
      { id: 1, driver: "Driver 1", deliveryTime: 50 },
      { id: 2, driver: "Driver 2", deliveryTime: 56 },
    ],
  });
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
