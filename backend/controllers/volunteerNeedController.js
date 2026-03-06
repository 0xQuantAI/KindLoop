import VolunteerNeed from '../models/VolunteerNeed.js';
import Volunteer from '../models/Volunteer.js';
import Organization from '../models/Organization.js';

export const create = async (req, res) => {
  try {
    const organization = req.organization;
    if (!organization.approved) {
      return res.status(403).json({ error: 'Your organization must be approved before posting needs' });
    }
    const {
      title,
      description,
      category,
      location,
      date,
      volunteersNeeded,
      contactInstructions,
      estimatedHours,
    } = req.body;
    if (!title || !category || !date || !volunteersNeeded) {
      return res.status(400).json({ error: 'Title, category, date, and volunteers needed are required' });
    }
    const need = await VolunteerNeed.create({
      title,
      description: description || '',
      category,
      organizationId: organization._id,
      location: location || '',
      date: new Date(date),
      volunteersNeeded: parseInt(volunteersNeeded),
      contactInstructions: contactInstructions || '',
      estimatedHours: estimatedHours ? parseInt(estimatedHours) : 0,
    });
    const populated = await VolunteerNeed.findById(need._id)
      .populate('organizationId', 'name location');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const list = async (req, res) => {
  try {
    const { status, category, location, date } = req.query;
    const filter = {};
    // Show both open and filled so volunteers can join as additional on filled ones
    filter.status = status ? status : { $in: ['open', 'filled'] };
    if (category) filter.category = category;
    if (location) filter.location = new RegExp(location, 'i');
    if (date) filter.date = { $gte: new Date(date) };
    const needs = await VolunteerNeed.find(filter)
      .populate('organizationId', 'name location')
      .populate('volunteersJoined', 'name email phone')
      .sort({ date: 1 });
    res.json(needs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const need = await VolunteerNeed.findById(req.params.id)
      .populate('organizationId', 'name location contactPerson email phone')
      .populate('volunteersJoined', 'name email phone');
    if (!need) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }
    res.json(need);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const volunteerForNeed = async (req, res) => {
  try {
    const need = await VolunteerNeed.findById(req.params.id);
    if (!need) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }
    // Allow joining when open (regular slot) or when filled (as additional volunteer)
    if (need.status !== 'open' && need.status !== 'filled') {
      return res.status(400).json({ error: 'This opportunity is no longer accepting volunteers' });
    }
    const volunteerId = req.volunteer._id;
    if (need.volunteersJoined.some((id) => id.toString() === volunteerId.toString())) {
      return res.status(400).json({ error: 'You have already signed up for this opportunity' });
    }
    need.volunteersJoined.push(volunteerId);
    if (need.volunteersJoined.length >= need.volunteersNeeded && need.status === 'open') {
      need.status = 'filled';
    }
    await need.save();
    // Add to volunteer's opportunities
    await Volunteer.findByIdAndUpdate(volunteerId, {
      $addToSet: { opportunitiesJoined: need._id },
    });
    const populated = await VolunteerNeed.findById(need._id)
      .populate('organizationId', 'name location')
      .populate('volunteersJoined', 'name email phone');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getByOrganization = async (req, res) => {
  try {
    const needs = await VolunteerNeed.find({ organizationId: req.organization._id })
      .populate('volunteersJoined', 'name email phone')
      .sort({ date: 1 });
    res.json(needs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
