import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  phone: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  interests: [{
    type: String,
    enum: ['Baking', 'Tutoring', 'Event Help', 'Senior Care', 'Animal Care', 'Community Service'],
  }],
  opportunitiesJoined: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VolunteerNeed',
  }],
}, {
  timestamps: true,
});

export default mongoose.model('Volunteer', volunteerSchema);
