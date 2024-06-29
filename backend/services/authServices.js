const Doctor = require('../model/Doctor');
const MeetingReport = require('../model/MeetingReport');
const MedicalPrescription = require('../model/MedicalPrescription');
const OTP = require('../model/OTP');
const User = require('../model/User');

// col-OTP
const sendOTP = async (email) => {
    let token = require('../utils/createToken')();
    let otp = require('../utils/createOTP')();

    await OTP.create({ email: email, otp: otp, token: token });
    return token;
}

const verifyOTP = async (token, otp) => {
    const user = await OTP.findOne({ $and: [{ token: token }, { otp: otp }] });
    if (user) {
        await OTP.deleteMany({ email: user.email });

        if (!await isUserExisting(user.email))
            await createUser(user.email);
        return user.email;
    }
    else {
        throw 'Incorrect OTP'
    }
}

// col-User
const isUserExisting = async (email) => {
    return await User.findOne({ email: email }) != null ? true : false;
}

const getUser = async (email) => {
    return await User.findOne({ email: email });
}

const createUser = async (email) => {
    return await User.create({ email: email });
}

const appendPrescriptionToUser = async (email, prescription_id) => {
    await User.findOneAndUpdate({ email: email }, { $push: { medicalHistory: prescription_id } });
}

// col-meetingReport
const createMeetingReport = async (body) => {
    return await MeetingReport.create(body);
}

const getMeetingDetails = async (meeting_id) => {
    return await MeetingReport.findById(meeting_id);
}

// col-Doc
const createDoctor = async (email) => {
    return await Doctor.create({ email: email });
}

const searchDocWithShortestQueue = async () => {
    const data = await Doctor.aggregate([{
        $addFields: {
            size: {
                $size: "$queue"
            }
        }
    },
    {
        $sort: {
            size: 1
        }
    },
    {
        $limit: 1
    }]);
    return data;
}

const appendMeetingToDoc = async (doctor_id, meeting_id) => {
    const data = await Doctor.findByIdAndUpdate(doctor_id, { $push: { queue: meeting_id } });
    return data.queue.length;
}

const removeMeetingFromDoc = async (doctor_id) => {
    const data = await Doctor.findByIdAndUpdate(doctor_id, { $pop: { queue: -1 } });
}

// Col-Prescription
const createPrescription = async (email, body) => {
    const prescription = await MedicalPrescription.create({ email: email, ...body });
    return prescription;
}

module.exports = { sendOTP, verifyOTP, createDoctor, searchDocWithShortestQueue, getUser, appendPrescriptionToUser, createMeetingReport, getMeetingDetails, appendMeetingToDoc, removeMeetingFromDoc, createPrescription };
