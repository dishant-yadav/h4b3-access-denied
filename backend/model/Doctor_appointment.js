const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  profilePhoto: {
    type: String,
    required: false
  },
  registrationNumber: {
    type: String,
    required: false
  },
  specialty: {
    type: String,
    required: false
  },
  qualification: {
    type: String,
    required: false
  },
  bio: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  availability: [{
    day: {
      type: String,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  }],
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', DoctorSchema);
