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
      return res.status(400).json({ message: 'Email already in use' });
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
    let DOC=await doctor.save();

    // Respond with success message
    res.status(201).json({ message: "Doctor registered successfully!!", doctor:DOC });
  } catch (error) {
    // Handle errors with detailed logging
    console.error('Error during doctor registration:', error);
    res.status(500).json({message: "error in response", error: error.message});
  }
});

// Login a doctor
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find doctor by registration number
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ success: false, message: 'Doctor not found' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Password not valid' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: doctor._id }, JWT_SECRET, { expiresIn: '2d' });

    // Set the token as a cookie
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

    // Respond with success message, doctor details including _id, and token
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      doctor: {
        _id: doctor._id,
        name: doctor.name,
        profilePhoto: doctor.profilePhoto,
        registrationNumber: doctor.registrationNumber,
        specialty: doctor.specialty,
        qualification: doctor.qualification,
        bio: doctor.bio,
        phone: doctor.phone,
        address: doctor.address,
        email: doctor.email,
        availability: doctor.availability
        // Add any other fields you want to include
      },
      token
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
