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

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
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
