const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const Appointment = require('../model/appointment');
const Doctor = require('../model/Doctor_appointment');
const response = require('../utils/response');

const appointmentServices = require('../services/docAppServices');
const slotServices = require('../services/slotServices');

const router = express.Router();

// fetch all slots for a doctor for a given date
router.post('/slots', async (req, res) => {
  try {
    const { doctor, date } = req.body;

    console.log(req.body)

    let totalSlots = await appointmentServices.generateArrayFromStartAndEndTime(doctor);
    let allSlots = await slotServices.fetchAllSlots(doctor, date);

    let allSlotsWithIsBooked = [];

    for (const element of totalSlots) {
      let slot = allSlots.find(slot => slot.time === element)
      let x = (slot) ? { time: element, isBooked: true } : { time: element, isBooked: false }
      allSlotsWithIsBooked.push(x);
    }
    console.log(allSlotsWithIsBooked);

    res.status(200).json(response(true, allSlotsWithIsBooked));
  } catch (error) {
    res.json(response(false, error));
  }
});

// Create slots for a doctor
router.post('/slots/create', async (req, res) => {
  try {
    const { doctor, patient, date, time, notes, appointment } = req.body;

    const Dbdoctor = await Doctor.findById(doctor);
    if (!Dbdoctor) {
      throw new Error('Doctor not found');
    }

    if (!doctor || !patient || !date || !time) {
      throw new Error('Missing required fields');
    }
    else if (await slotServices.isSlotAlreadyExists(doctor, date, time)) {
      throw new Error('Slot already exists');
    }

    const slot = slotServices.createSlot({ doctor, patient, date, time, notes });

    res.status(201).json(response(true, slot));
  } catch (error) {
    res.json(response(false, error));
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

module.exports = router;
