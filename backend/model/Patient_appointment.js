const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  name: {
    type: String,
    required: false,
    default: "Patient"
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: 6,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  address: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    enum: ["male", "female", "others"],
    default: "male",
    required: false
  },
  mobileNumber: {
    type: String,
  },
  age: {
    type: Number,
    max: 100,
    required: false
  },
  weight: {
    type: String,
    required: false
  },
  height: {
    type: String,
    required: false
  },
  bloodGroup: {
    type: String,
    required: false
  },
  bloodPressure: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
