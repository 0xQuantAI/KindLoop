import express from 'express';
import {
  create,
  list,
  getById,
  volunteerForNeed,
  getByOrganization,
} from '../controllers/volunteerNeedController.js';
import { authenticateVolunteer } from '../middleware/auth.js';
import { authenticateOrganization } from '../middleware/auth.js';

const router = express.Router();

// Public (no auth) - list open opportunities for everyone, including when not logged in
router.get('/', list);

// Organization - get own needs (must be before /:id)
router.get('/org/my', authenticateOrganization, getByOrganization);

// Public (no auth) - opportunity detail for everyone
router.get('/:id', getById);

// Organization - create need
router.post('/', authenticateOrganization, create);

// Volunteer - sign up for opportunity
router.post('/:id/volunteer', authenticateVolunteer, volunteerForNeed);

export default router;
