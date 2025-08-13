# GreenCart Logistics — Full Stack Assessment (Scaffold)

This repository is a ready-to-run scaffold implementing the **GreenCart Logistics** assessment requirements (Frontend + Backend). It is intentionally minimal but functional so you can run locally, seed the database, and run the simulation right away.

**What is included**
- `backend/` — Node.js + Express backend using `pg` (node-postgres), JWT auth, bcrypt password hashing, simulation logic, CRUD endpoints, database seeding script, unit tests with Jest + Supertest.
- `frontend/` — React (Vite) app using hooks, JWT login, pages: Dashboard, Simulation, Management (drivers/routes/orders), Chart.js charts.
- `sql/schema.sql` — schema to create necessary tables (optional).
- `data/seed.json` — sample seed data (drivers, routes, orders).
- `.env.example` files for both frontend & backend.

**Important**
- Node modules are NOT included. Run `npm install` in both `backend` and `frontend`.
- You must provide a PostgreSQL connection string (Neon or other). Put it into `backend/.env` as `DATABASE_URL`.
- The Neon connection string you provided earlier may be used. DO NOT commit credentials to GitHub — put them in `.env`.

---
See `/RUN_INSTRUCTIONS.md` for step-by-step commands to run locally.
