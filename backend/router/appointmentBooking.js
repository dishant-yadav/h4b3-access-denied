const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const Appointment = require('../model/appointment');
const Doctor = require('../model/Doctor_appointment');
const Slot = require('../model/slotModel');

const router = express.Router();

// Create slots for a doctor
router.post('/slots/create', authMiddleware, async (req, res) => {
  try {
    const { doctorRegistrationNumber, date } = req.body;
    const doctor = await Doctor.findOne({doctorRegistrationNumber});
    if (!doctor) {
      return res.status(400).send('Doctor not found');
    }

    const availability = doctor.availability;
    const slots = [];

    availability.forEach(slot => {
      const { day, startTime, endTime } = slot;
      const start = new Date(`${date}T${startTime}`);
      const end = new Date(`${date}T${endTime}`);
      let current = new Date(start);

      while (current < end) {
        const slotEndTime = new Date(current.getTime() + 15 * 60000);
        if (slotEndTime <= end) {
          slots.push({
            doctor: doctorId,
            date,
            startTime: current.toISOString(),
            endTime: slotEndTime.toISOString()
          });
        }
        current = slotEndTime;
      }
    });

    await Slot.insertMany(slots);
    res.status(201).json({ message: 'Slots created successfully' , slots});
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Book a slot
router.post('/slots/book', authMiddleware, async (req, res) => {
  try {
    const { slotId, patientId, notes } = req.body;

    const slot = await Slot.findById(slotId);
    if (!slot || slot.isBooked) {
      return res.status(400).send('Slot not available');
    }

    const appointment = new Appointment({
      doctor: slot.doctor,
      patient: patientId,
      date: slot.date,
      time: slot.startTime,
      notes
    });

    await appointment.save();

    slot.isBooked = true;
    slot.appointment = appointment._id;
    await slot.save();

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get available slots for a doctor on a specific date
router.get('/slots/available/:doctorId/:date', authMiddleware, async (req, res) => {
  try {
    const { doctorId, date } = req.params;
    const slots = await Slot.find({ doctor: doctorId, date, isBooked: false });
    res.status(200).json({ slots });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
