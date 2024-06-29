const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const Appointment = require('../model/appointment');
const Doctor = require('../model/Doctor_appointment');

const router = express.Router();

// Create a new appointment --> done
router.post('/post', authMiddleware, async (req, res) => {
  try {
    const { doctorRegistrationNumber, patient, date, time, notes } = req.body;

    // Find the doctor by registration number
    const doctor = await Doctor.findOne({ registrationNumber: doctorRegistrationNumber });
    if (!doctor) {
      return res.status(400).send('Doctor not found');
    }

    const appointment = new Appointment({
      doctor: doctor._id,
      patient,
      date,
      time,
      notes
    });

    await appointment.save();
    res.status(201).send('Appointment created successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get all appointments for a specific doctor
router.get('/doctor/:doctorId', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.doctorId }).populate('doctor').populate('patient');
    res.status(200).send(appointments);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Get all appointments for a specific patient
router.get('/patient/:patientId', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.patientId }).populate('doctor').populate('patient');
    res.status(200).send(appointments);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Update an appointment
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { date, time, notes } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { date, time, notes },
      { new: true, runValidators: true }
    );
    if (!appointment) {
      return res.status(404).send('Appointment not found');
    }
    res.status(200).send(appointment);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Delete an appointment
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).send('Appointment not found');
    }
    res.status(200).send('Appointment deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = router;
