See the previous assistant message for step-by-step Railway and Netlify deploy instructions. Key points:
- Push this repo to GitHub
- Deploy backend to Railway (attach Postgres)
- Set env vars: DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET, PLAY_MONEY_MODE=true
- Run migrations and seed
- Deploy frontend to Netlify with VITE_API_URL pointing to Railway backend
