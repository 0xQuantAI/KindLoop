import express from 'express';
import {
  login,
  getVolunteers,
  getOrganizations,
  getNeeds,
  approveOrganization,
  removeNeed,
  markNeedCompleted,
} from '../controllers/adminController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/volunteers', authenticateAdmin, getVolunteers);
router.get('/organizations', authenticateAdmin, getOrganizations);
router.get('/needs', authenticateAdmin, getNeeds);
router.put('/organizations/:id/approve', authenticateAdmin, approveOrganization);
router.delete('/needs/:id', authenticateAdmin, removeNeed);
router.put('/needs/:id/complete', authenticateAdmin, markNeedCompleted);

export default router;
