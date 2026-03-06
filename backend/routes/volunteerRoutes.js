import express from 'express';
import { register, login, getMe } from '../controllers/volunteerController.js';
import { authenticateVolunteer } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateVolunteer, getMe);

export default router;
