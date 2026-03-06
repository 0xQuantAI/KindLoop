# KindLoop – GitHub & Vercel Deployment Guide

## 1. Commit and push to GitHub

### One-time setup

1. **Initialize Git** (if not already):

   ```bash
   cd /Users/binnythomas/0xQuant/VolunteerMatch
   git init
   ```

2. **Create a repo on GitHub**

   - Go to [github.com/new](https://github.com/new)
   - Name it (e.g. `KindLoop` or `volunteer-match`)
   - Do **not** add a README or .gitignore (you already have them)
   - Create the repository

3. **Add remote and first commit**

   ```bash
   git add .
   git status   # confirm .env and node_modules are not listed
   git commit -m "Initial commit: KindLoop volunteer app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and repo name.

### Later updates

```bash
git add .
git commit -m "Your message"
git push
```

---

## 2. Deploy frontend to Vercel

Vercel will host the **frontend** only. The **backend** must run somewhere else (e.g. Render, Railway) and be reachable via a public URL.

### Connect repo to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (e.g. with GitHub).
2. **Add New Project** → **Import** your GitHub repo.
3. **Configure:**
   - **Root Directory:** click **Edit**, set to `frontend`, then **Continue**.
   - **Framework Preset:** Vite (should be auto-detected).
   - **Build Command:** `npm run build` (default).
   - **Output Directory:** `dist` (default).
   - **Install Command:** `npm install` (default).
4. **Environment variables** (important):
   - Add:
     - **Name:** `VITE_API_URL`
     - **Value:** your backend API base URL, e.g. `https://your-backend.onrender.com/api`
   - If you haven’t deployed the backend yet, use a placeholder and update after the backend is live.
5. Click **Deploy**.

After deploy, Vercel gives you a URL (e.g. `https://your-app.vercel.app`). The app will call the API using `VITE_API_URL`.

### After first deploy

- **Redeploys:** Every push to `main` (or your production branch) will trigger a new deploy.
- **Changing env:** Project → **Settings** → **Environment Variables** → edit `VITE_API_URL` → redeploy.

---

## 3. Backend (required for the app to work)

The Node/Express backend is **not** deployed on Vercel. You need to host it elsewhere and point the frontend at it.

### Option A: Render (free tier)

1. Go to [render.com](https://render.com) and sign in with GitHub.
2. **New** → **Web Service**.
3. Connect the same repo.
4. **Settings:**
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:**
     - `NODE_ENV` = `production`
     - `MONGODB_URI` = your MongoDB Atlas URI
     - `JWT_SECRET` = a long random secret (do not use the one from .env.example)
     - `FRONTEND_URL` = your Vercel URL, e.g. `https://your-app.vercel.app`
5. Deploy. Copy the service URL (e.g. `https://kindloop-backend.onrender.com`).

Then in **Vercel** set:

- `VITE_API_URL` = `https://kindloop-backend.onrender.com/api`

Redeploy the frontend so it uses the new API URL.

### Option B: Railway, Fly.io, etc.

Same idea: run the app from the `backend` folder, set `PORT`, `MONGODB_URI`, `JWT_SECRET`, and `FRONTEND_URL`, then set `VITE_API_URL` on Vercel to `https://your-backend-url/api`.

---

## 4. Checklist

| Step | Done |
|------|------|
| Git init, add, commit | |
| Create GitHub repo and push | |
| Deploy frontend on Vercel (root = `frontend`) | |
| Set `VITE_API_URL` on Vercel to backend API URL | |
| Deploy backend (Render/Railway/etc.) | |
| Set backend `FRONTEND_URL` to Vercel URL (for CORS) | |
| Test login, opportunities, and sign-up flows | |

---

## 5. Env reference

**Frontend (Vercel)**  
- `VITE_API_URL` – Backend API base, e.g. `https://your-api.com/api`

**Backend (Render / Railway / etc.)**  
- `PORT` – Provided by host (e.g. Render sets it)
- `MONGODB_URI` – MongoDB connection string (e.g. Atlas)
- `JWT_SECRET` – Strong secret for production
- `FRONTEND_URL` – Vercel app URL for CORS (e.g. `https://your-app.vercel.app`)

Use `.env.example` in `backend/` and `frontend/` as templates; never commit real `.env` files.
