const express = require('express');
const router = express.Router();
const Patient = require('../model/Patient_appointment');

// Create a new patient --> done
router.post('/post', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all patients -> done
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).send(patients);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a specific patient by ID --> done
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).send();
    res.status(200).send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a patient by ID  -> done
router.patch('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!patient) return res.status(404).send();
    res.status(200).send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a patient by ID --> done
router.delete('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).send();
    res.status(200).send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
