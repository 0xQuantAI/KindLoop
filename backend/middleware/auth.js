import jwt from 'jsonwebtoken';
import Volunteer from '../models/Volunteer.js';
import Organization from '../models/Organization.js';
import Admin from '../models/Admin.js';

export const authenticateVolunteer = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Please log in' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const volunteer = await Volunteer.findById(decoded.userId);
    if (!volunteer) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.volunteer = volunteer;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const authenticateOrganization = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Please log in' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const organization = await Organization.findById(decoded.organizationId);
    if (!organization) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.organization = organization;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Please log in' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.adminId);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
