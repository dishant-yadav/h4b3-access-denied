const Slot = require('../model/Slot');

const createSlot = async (
    body) => {
    const { doctor, patient, date, time, notes, appointment } = body;

    const newSlot = await Slot.create({
        doctor,
        patient,
        date,
        time,
        notes,
        appointment
    })
    return newSlot;
}

const isSlotAlreadyExists = async (doctor, date, startTime) => {
    const slot = await Slot.findOne({ doctor, date, startTime });
    return !!slot; // return true if slot exists, false otherwise
}

const fetchAllSlots = async (doctor, date) => {
    const slots = await Slot.find({ doctor, date });
    return slots;
}

module.exports = {
    createSlot,
    isSlotAlreadyExists,
    fetchAllSlots
}