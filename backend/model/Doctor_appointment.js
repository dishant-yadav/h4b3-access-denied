const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  profilePhoto:{
    type : String
  },
  registrationNumber:{
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  qualification:{
    type: String,
    required: true
  },
  bio:{
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
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
  password:{
    type: String,
    default:""
  }
},{
  timestamps: true
});

module.exports = mongoose.model('Doctor', DoctorSchema);
