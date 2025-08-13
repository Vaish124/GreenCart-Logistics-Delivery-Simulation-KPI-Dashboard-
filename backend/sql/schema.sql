-- Basic schema for GreenCart Logistics

CREATE TABLE IF NOT EXISTS managers (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT
);

CREATE TABLE IF NOT EXISTS drivers (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  current_shift_hours INTEGER DEFAULT 0,
  past_7_day_hours INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS routes (
  id UUID PRIMARY KEY,
  route_id TEXT UNIQUE NOT NULL,
  distance_km REAL NOT NULL,
  traffic_level TEXT NOT NULL,
  base_time_minutes INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY,
  order_id TEXT UNIQUE NOT NULL,
  value_rs REAL NOT NULL,
  assigned_route TEXT REFERENCES routes(route_id),
  delivery_timestamp TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS simulations (
  id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  input_json JSONB,
  result_json JSONB
);
