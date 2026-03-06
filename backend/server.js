import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import volunteerRoutes from './routes/volunteerRoutes.js';
import organizationRoutes from './routes/organizationRoutes.js';
import volunteerNeedRoutes from './routes/volunteerNeedRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Allow frontend origin: FRONTEND_URL, localhost, or any *.vercel.app (preview deployments)
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:5174',
]
  .filter(Boolean);
function corsOrigin(origin, callback) {
  if (!origin) return callback(null, true); // same-origin or non-browser
  if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
    return callback(null, true);
  }
  callback(null, false);
}
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json());

app.use('/api/volunteers', volunteerRoutes);
app.use('/api/org', organizationRoutes);
app.use('/api/needs', volunteerNeedRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kindloop')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
