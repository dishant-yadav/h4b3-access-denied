const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require('../model/Doctor_appointment');

const router = express.Router();
const JWT_SECRET = 'civiryvrbouvbacsvftwflawyf'; 

// Register a new doctor
router.post('/register', async (req, res) => {
  try {
    const { name, profilePhoto, registrationNumber, specialty, qualification, bio, phone, address, email, availability, password } = req.body;

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).send('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = new Doctor({
      name,
      profilePhoto,
      registrationNumber,
      specialty,
      qualification,
      bio,
      phone,
      address,
      email,
      availability,
      password: hashedPassword
    });

    await doctor.save();
    res.status(201).send('Doctor registered successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login a doctor
router.post('/login', async (req, res) => {
  try {
    const { registrationNumber, password } = req.body;
    const doctor = await Doctor.findOne({ registrationNumber });
    if (!doctor) {
      return res.status(400).send('Invalid registration number and doctor does not exist');
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return res.status(400).send('Invalid email or password');
    }

    const token = jwt.sign({ id: doctor._id }, JWT_SECRET, { expiresIn: '1h' });

    // Set the token as a cookie
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

    res.status(200).json({ message: 'Login successful', doctor });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = router;
