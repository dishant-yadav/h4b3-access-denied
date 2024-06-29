const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    min:6
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address:{
    type: String,
    required:true
  },
  gender:{
    type: String,
    enum: ["male", "female", "others", "none"],
    default: "none"
  },
  mobileNumber:{
    type: String,
    required: true,
    unique: true
  },
  age:{
    type: Number,
    max: 100,
    required: true
  }
});

module.exports = mongoose.model("Patient", PatientSchema);
