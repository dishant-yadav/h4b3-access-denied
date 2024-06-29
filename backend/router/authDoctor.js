const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require('../model/Doctor_appointment');
const response = require('../utils/response');

const router = express.Router();
const JWT_SECRET = 'civiryvrbouvbacsvftwflawyf'; // Example, consider using environment variables

// Register a new doctor
router.post('/register', async (req, res) => {
  try {
    const { name, profilePhoto, registrationNumber, specialty, qualification, bio, phone, address, email, availability, password } = req.body;

    // Check if the email already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({message:'Email already in use'});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new doctor instance
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
      password: hashedPassword // Store the hashed password
    });

    // Save the doctor to the database
    await doctor.save();

    // Respond with success message
    res.status(201).json({message: "Doctor registered successfully!!"});
  } catch (error) {
    // Handle errors
    res.status(500).json({message: "error in response"});
  }
});

// Login a doctor
router.post('/login', async (req, res) => {
  try {
    const { registrationNumber, password } = req.body;
    // console.log(registrationNumber, password)
    const doctor = await Doctor.findOne({ registrationNumber });
    if (!doctor) {
      throw new Error("Doctor not found")
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    // console.log(isPasswordValid)
    if (!isPasswordValid) {
      throw new Error("Password not valid")
    }

    const token = jwt.sign({ id: doctor._id }, JWT_SECRET, { expiresIn: '2d' });

    // Set the token as a cookie
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

    // Respond with success message and token
    return res.status(200).json({
      message: 'Login successful',
      doctor,
      token
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({message:"login error"});
  }
});

module.exports = router;
