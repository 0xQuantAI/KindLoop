import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Volunteer from '../models/Volunteer.js';
import VolunteerNeed from '../models/VolunteerNeed.js';

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, city, interests } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    const existing = await Volunteer.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const volunteer = await Volunteer.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || '',
      city: city || '',
      interests: interests || [],
    });
    const token = generateToken(volunteer._id);
    res.status(201).json({
      token,
      user: {
        id: volunteer._id,
        name: volunteer.name,
        email: volunteer.email,
        phone: volunteer.phone,
        city: volunteer.city,
        interests: volunteer.interests,
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
    const volunteer = await Volunteer.findOne({ email: email.toLowerCase() });
    if (!volunteer) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const valid = await bcrypt.compare(password, volunteer.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = generateToken(volunteer._id);
    res.json({
      token,
      user: {
        id: volunteer._id,
        name: volunteer.name,
        email: volunteer.email,
        phone: volunteer.phone,
        city: volunteer.city,
        interests: volunteer.interests,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const volunteer = req.volunteer;
    const opportunitiesJoined = await VolunteerNeed.find({
      _id: { $in: volunteer.opportunitiesJoined },
    })
      .populate('organizationId', 'name location')
      .sort({ date: 1 });
    res.json({
      user: {
        id: volunteer._id,
        name: volunteer.name,
        email: volunteer.email,
        phone: volunteer.phone,
        city: volunteer.city,
        interests: volunteer.interests,
      },
      opportunitiesJoined,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
