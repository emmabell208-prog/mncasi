# Gambling Starter (Deploy-ready)
This is a deploy-ready starter skeleton prepared for quick demo/deploy to Railway (backend + Postgres) and Netlify (frontend). It uses Play-Money mode by default and seeds an admin user (admin@example.com/admin123).

Quick start (local with Docker):
1. cp backend/.env.example backend/.env
2. docker-compose up --build
3. cd backend && npx prisma migrate dev
4. cd backend && npm run seed

See README_DEPLOY_RAILWAY_NETLIFY.md for Railway + Netlify steps.
