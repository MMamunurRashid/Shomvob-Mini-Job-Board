const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  companyDetails: { type: String, default: '' },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  deadline: { type: Date, required: true },
  // jobType can be 'Remote', 'Onsite', or 'Hybrid'
  jobType: {
    type: String,
    enum: ['Remote', 'Onsite', 'Hybrid'],
    required: true
  },
  experience: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);
