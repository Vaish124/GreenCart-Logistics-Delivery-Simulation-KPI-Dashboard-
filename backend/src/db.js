const { Pool } = require('pg');
require('dotenv').config();
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL not set in .env");
  process.exit(1);
}
const pool = new Pool({
  connectionString,
  // neon requires ssl: rejectUnauthorized false; but keep general
  ssl: { rejectUnauthorized: false }
});
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
