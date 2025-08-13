const express = require("express");
const cors = require("cors");
const pool = require("./db");

const managementRoutes = require("./routes/management");
const simulationRoutes = require("./routes/simulation");
const kpiRoutes = require("./routes/kpi");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/management", managementRoutes);
app.use("/api/simulation", simulationRoutes);
app.use("/api/kpi", kpiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
