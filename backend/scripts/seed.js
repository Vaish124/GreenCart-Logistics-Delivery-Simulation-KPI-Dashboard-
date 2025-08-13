const pool = require("../src/db");
const seedData = require("./seed.json");

async function run() {
  try {
    // Clear tables
    await pool.query("DELETE FROM orders");
    await pool.query("DELETE FROM routes");
    await pool.query("DELETE FROM drivers");
    await pool.query("DELETE FROM managers");

    // Seed managers
    for (const manager of seedData.managers) {
      await pool.query(
        "INSERT INTO managers (id, email, password, name) VALUES ($1, $2, $3, $4)",
        [manager.id, manager.email, manager.password, manager.name]
      );
    }

    // Seed drivers
    for (const driver of seedData.drivers) {
      await pool.query(
        "INSERT INTO drivers (id, name, current_shift_hours, past_7_day_hours) VALUES ($1, $2, $3, $4)",
        [driver.id, driver.name, driver.current_shift_hours, driver.past_7_day_hours]
      );
    }

    // Seed routes
    for (const route of seedData.routes) {
      await pool.query(
        "INSERT INTO routes (id, route_id, distance_km, traffic_level, base_time_minutes) VALUES ($1, $2, $3, $4, $5)",
        [route.id, route.route_id, route.distance_km, route.traffic_level, route.base_time_minutes]
      );
    }

    // Seed orders (now matching new table)
    for (const order of seedData.orders) {
      await pool.query(
        `INSERT INTO orders 
         (order_id, route_id, driver_id, late, profit, fuelcost, delivered_minutes, assigned_driver) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          order.order_id,
          order.assigned_route,
          order.driver_id || null,
          order.late || false,
          order.profit || 0,
          order.fuelcost || 0,
          order.delivered_minutes || 0,
          order.assigned_driver || null
        ]
      );
    }

    console.log("Seed complete");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
