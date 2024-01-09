const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  company_logo: {
    type: String,
    required: true,
  },
  job_position: {
    type: String,
    required: true,
  },
  monthly_salary: {
    type: String,
    required: true,
  },
  job_type: {
    type: String,
    enum: ['full-time', 'part-time'],
    required: true,
  },
  remote_office: {
    type: String,
    enum: ['remote', 'office'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  job_description: {
    type: String,
    required: true,
  },
  about_company: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  information: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userCollection',
    required: true,
  },
});

const jobCollection = new mongoose.model('jobCollection', jobSchema);

module.exports = jobCollection;
