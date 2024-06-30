const Slot = require('../model/Slot');

const createSlot = async (
    body) => {
    const { doctor, patient, date, time, notes } = body;

    const newSlot = await Slot.create({
        doctor,
        patient,
        date,
        time,
        notes
    })
    return newSlot;
}

const isSlotAlreadyExists = async (doctor, date, time) => {
    const slot = await Slot.findOne({ doctor, date, time });
    // console.log("slot", slot);
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