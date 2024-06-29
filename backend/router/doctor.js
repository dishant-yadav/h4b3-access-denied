const express = require('express');
const router = express.Router();
const Doctor = require('../model/Doctor_appointment');

// Create a new doctor --> done
router.post('/', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).send(doctor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all doctors --> done
router.get('/get', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).send(doctors);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a specific doctor by ID --> done
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).send();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a doctor by ID --> done
router.patch('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doctor) return res.status(404).send();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a doctor by ID --> done
router.delete('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).send();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
