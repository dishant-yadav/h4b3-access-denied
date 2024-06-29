const Doctor = require('../model/Doctor_appointment')
const slotServices = require('./slotServices')

// function which will convert number less than 10 to 2 digit number
// for example 1 to 0
function convertToTwo(day) {
    if (day < 10) {
        return `0${day}`
    }
    return day
}

const generateArrayFromStartAndEndTime = async (doctor) => {
    const Dbdoctor = await Doctor.findById(doctor);
    if (!Dbdoctor) {
        throw new Error('Doctor not found');
    }
    const slots = [];
    const startTime = Number(Dbdoctor.availability.startTime.split(':')[0]);
    const endTime = Number(Dbdoctor.availability.endTime.split(':')[0]);

    for (let i = startTime; i < endTime; i++) {
        let day = convertToTwo(i)
        let h1 = day + ":00";
        let h2 = day + ":30";
        slots.push(h1);
        slots.push(h2);
    }
    return slots;
}
module.exports = {
    generateArrayFromStartAndEndTime
}