# Run Instructions (Local)

## Prerequisites
- Node.js 18+ and npm
- PostgreSQL or a cloud Postgres (Neon/Postgres). You provided a Neon URL — use it.
- Optional: pnpm or yarn (npm works fine)

## 1) Backend
1. Open a terminal and go to `backend/`:
   ```bash
   cd greencart_project/backend
   ```
2. Copy the example env and edit it (put your Neon connection string and a JWT secret):
   ```bash
   cp .env.example .env
   # edit .env and set DATABASE_URL to your Neon string (keep other vars)
   ```
3. Install dependencies and seed DB:
   ```bash
   npm install
   npm run seed
   ```
   `npm run seed` creates tables and loads `data/seed.json` into the database.
4. Start the server:
   ```bash
   npm start
   ```
   Server will run on `http://localhost:4000` by default.

5. Run tests (optional):
   ```bash
   npm test
   ```

## 2) Frontend
1. In a new terminal, go to `frontend/`:
   ```bash
   cd greencart_project/frontend
   ```
2. Copy env and set API url if needed:
   ```bash
   cp .env.example .env
   # EDIT .env and set VITE_API_URL=http://localhost:4000/api
   ```
3. Install and start dev server:
   ```bash
   npm install
   npm run dev
   ```
   The frontend will run on Vite's default port (usually http://localhost:5173).

## Login (seeded user)
- Use email: `manager@greencart.test`
- Password: `Password123!`

## Notes & Deployment
- The backend expects `DATABASE_URL` with SSL enabled for Neon. Example format (do not commit credentials):
  ```text
  DATABASE_URL='postgresql://user:password@host:port/dbname?sslmode=require'
  ```
- For production deployments use Render/Railway for backend and Vercel/Netlify for frontend.

---
If you want I can also provide instructions to deploy to Render/Vercel and an example GitHub Actions pipeline.
