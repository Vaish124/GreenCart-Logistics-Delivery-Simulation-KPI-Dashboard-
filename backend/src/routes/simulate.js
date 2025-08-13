const express = require('express');
const router = express.Router();
const db = require('../db');
const { runSimulation } = require('../utils/simulation');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');

// Run simulation (protected)
router.post('/', auth, async (req, res) => {
  const { number_of_drivers, route_start_time, max_hours_per_driver } = req.body;
  // validate
  if (number_of_drivers == null || route_start_time == null || max_hours_per_driver == null) {
    return res.status(400).json({error:'missing_parameters'});
  }
  if (number_of_drivers <= 0 || max_hours_per_driver <= 0) return res.status(400).json({error:'invalid_parameters'});

  try {
    const dp = await db.query('SELECT id, name, current_shift_hours, past_7_day_hours FROM drivers ORDER BY name');
    const rp = await db.query('SELECT id, route_id, distance_km, traffic_level, base_time_minutes FROM routes');
    const op = await db.query('SELECT id, order_id, value_rs, assigned_route FROM orders');
    const drivers = dp.rows.map(r=>({id:r.id,name:r.name,current_shift_hours:r.current_shift_hours,past_7_day_hours:r.past_7_day_hours}));
    const routes = rp.rows.map(r=>({id:r.id,route_id:r.route_id,distance_km:r.distance_km,traffic_level:r.traffic_level,base_time_minutes:r.base_time_minutes}));
    const orders = op.rows.map(o=>({id:o.id,order_id:o.order_id,value_rs:o.value_rs,assigned_route:o.assigned_route}));

    const input = { number_of_drivers, route_start_time, max_hours_per_driver };
    const result = runSimulation({drivers, routes, orders, number_of_drivers, route_start_time, max_hours_per_driver});

    // persist simulation
    const id = uuidv4();
    await db.query('INSERT INTO simulations(id, input_json, result_json) VALUES($1,$2,$3)', [id, input, result]);

    res.json({id, input, result});
  } catch (err) {
    console.error(err);
    res.status(500).json({error:'server_error'});
  }
});

module.exports = router;
