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
      return res.status(400).json({message:'Email already in use'});
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
    res.status(201).json({message: 'Patient registered successfully', patient:patient});
  } catch (error) {
    res.status(500).json({message:"error in registering patient from backend", error});
  }
});

// Login a patient
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({message:"patient not found"});;
    }

    const isPasswordValid = await bcrypt.compare(password, patient.password);
    if (!isPasswordValid) {
      return res.status(400).json({message:"password is not valid"});;
    }

    const token = jwt.sign({ id: patient._id }, JWT_SECRET, { expiresIn: '1h' });

    // Set the token as a cookie
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

    res.status(200).json({ message: 'Login successful', patient: patient});
  } catch (error) {
    res.status(500).json({message:"error in logging in patient from backend", error});;
  }
});

module.exports = router;
