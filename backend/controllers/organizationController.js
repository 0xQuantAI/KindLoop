import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Organization from '../models/Organization.js';

const generateToken = (organizationId) => {
  return jwt.sign({ organizationId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const register = async (req, res) => {
  try {
    const { name, contactPerson, email, password, phone, location, description } = req.body;
    if (!name || !contactPerson || !email || !password) {
      return res.status(400).json({ error: 'Name, contact person, email, and password are required' });
    }
    const existing = await Organization.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const organization = await Organization.create({
      name,
      contactPerson,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || '',
      location: location || '',
      description: description || '',
    });
    const token = generateToken(organization._id);
    res.status(201).json({
      token,
      organization: {
        id: organization._id,
        name: organization.name,
        contactPerson: organization.contactPerson,
        email: organization.email,
        phone: organization.phone,
        location: organization.location,
        description: organization.description,
        approved: organization.approved,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const organization = await Organization.findOne({ email: email.toLowerCase() });
    if (!organization) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const valid = await bcrypt.compare(password, organization.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = generateToken(organization._id);
    res.json({
      token,
      organization: {
        id: organization._id,
        name: organization.name,
        contactPerson: organization.contactPerson,
        email: organization.email,
        phone: organization.phone,
        location: organization.location,
        description: organization.description,
        approved: organization.approved,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
