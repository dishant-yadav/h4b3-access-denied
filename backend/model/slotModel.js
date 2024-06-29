const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlotSchema = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  isBooked: {
    type: Boolean,
    default: false
  },
  appointment: {
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Slot', SlotSchema);
