const Doctor = require('../model/Doctor');
const Online = require('../model/Online');

const getDoctorById = async (id) => {
    return await Doctor.findById(id);
}

const heartbeat = async (id) => {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
        throw new Error('Doctor not found');
    }
    if (await Online.findOne({ type: 'Doctor', refId: doctor._id })) {
        await Online.findOneAndUpdate({ type: 'Doctor', refId: doctor._id }, { new: true });
    }
    else {
        await Online.create({ type: 'Doctor', refId: doctor._id });
    }
    return await Online.findOne({ type: 'User' });
}

const isAvailable = async (id) => {

    const doctor = await Doctor.findById(id);

    if (!doctor) {
        throw new Error('Doctor not found');
    }

    return await Online.findOne({ type: 'Doctor', refId: doctor._id });
}

module.exports = {
    getDoctorById,
    heartbeat,
    isAvailable
}