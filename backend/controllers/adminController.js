import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Volunteer from '../models/Volunteer.js';
import Organization from '../models/Organization.js';
import VolunteerNeed from '../models/VolunteerNeed.js';

const generateToken = (adminId) => {
  return jwt.sign({ adminId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = generateToken(admin._id);
    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find()
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find()
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(organizations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNeeds = async (req, res) => {
  try {
    const needs = await VolunteerNeed.find()
      .populate('organizationId', 'name contactPerson location')
      .populate('volunteersJoined', 'name email phone')
      .sort({ createdAt: -1 });
    res.json(needs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const approveOrganization = async (req, res) => {
  try {
    const org = await Organization.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    ).select('-password');
    if (!org) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.json(org);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeNeed = async (req, res) => {
  try {
    const need = await VolunteerNeed.findByIdAndDelete(req.params.id);
    if (!need) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }
    res.json({ message: 'Opportunity removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markNeedCompleted = async (req, res) => {
  try {
    const need = await VolunteerNeed.findByIdAndUpdate(
      req.params.id,
      { status: 'completed' },
      { new: true }
    )
      .populate('organizationId', 'name')
      .populate('volunteersJoined', 'name email');
    if (!need) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }
    res.json(need);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
