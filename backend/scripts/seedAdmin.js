import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@kindloop.local';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kindloop');
  const exists = await Admin.findOne({ email: ADMIN_EMAIL });
  if (exists) {
    console.log('Admin already exists:', ADMIN_EMAIL);
    process.exit(0);
    return;
  }
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await Admin.create({ email: ADMIN_EMAIL, password: hashed });
  console.log('Admin created:', ADMIN_EMAIL, '| Password:', ADMIN_PASSWORD);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
