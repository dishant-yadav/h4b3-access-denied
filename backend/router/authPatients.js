const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Patient = require('../model/Patient_appointment');

const router = express.Router();
const JWT_SECRET = 'civiryvrbouvbacsvftwflawyf'; 
// Register a new patient
router.post('/register', async (req, res) => {
  try {
    const { name, email, dateOfBirth, address, gender, mobileNumber, age, password } = req.body;

    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).send('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const patient = new Patient({
      name,
      email,
      dateOfBirth,
      address,
      gender,
      mobileNumber,
      age,
      password: hashedPassword
    });

    await patient.save();
    res.status(201).send('Patient registered successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login a patient
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).send('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, patient.password);
    if (!isPasswordValid) {
      return res.status(400).send('Invalid email or password');
    }

    const token = jwt.sign({ id: patient._id }, JWT_SECRET, { expiresIn: '1h' });

    // Set the token as a cookie
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
