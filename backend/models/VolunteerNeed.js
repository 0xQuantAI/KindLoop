import mongoose from 'mongoose';

const volunteerNeedSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Baking', 'Tutoring', 'Events', 'Food Drive', 'Community Help'],
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  location: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  volunteersNeeded: {
    type: Number,
    required: true,
    min: 1,
  },
  volunteersJoined: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',
  }],
  status: {
    type: String,
    enum: ['open', 'filled', 'completed'],
    default: 'open',
  },
  contactInstructions: {
    type: String,
    trim: true,
  },
  estimatedHours: {
    type: Number,
    min: 0,
  },
}, {
  timestamps: true,
});

// Update status when volunteers join
volunteerNeedSchema.pre('save', function(next) {
  if (this.volunteersJoined.length >= this.volunteersNeeded && this.status === 'open') {
    this.status = 'filled';
  }
  next();
});

export default mongoose.model('VolunteerNeed', volunteerNeedSchema);
