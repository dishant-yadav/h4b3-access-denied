const express = require('express');
const router = express.Router();
const Appointment = require('../model/appointment');

// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctor').populate('patient');
    res.status(200).send(appointments);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a specific appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('doctor').populate('patient');
    if (!appointment) return res.status(404).send();
    res.status(200).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update an appointment by ID
router.patch('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!appointment) return res.status(404).send();
    res.status(200).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an appointment by ID
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).send();
    res.status(200).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
