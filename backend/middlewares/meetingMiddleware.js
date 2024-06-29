const response = require("../utils/response");
const userServices = require('../services/userServices');
const doctorServices = require('../services/doctorServices');
const authServices = require('../services/authServices');

module.exports = async (req, res, next) => {
    const { id } = req.body;
    const { type } = req.body;
    const { meetingLink } = req.body;

    try {

        if (type === "User") {
            const user = await userServices.getUserById(id);

            const meeting = await authServices.getMeetingDetails(meetingLink);
            if (user) {
                return meeting.user === id ? next() : res.status(403).json(response(false, 'User not part of the meeting'));
            }
            else throw new Error('User not found');
        }
        else if (type === "Doctor") {
            const doc = await doctorServices.getUserById(id);

            const meeting = await authServices.getMeetingDetails(meetingLink);
            if (doc) {
                return meeting.doctor === id ? next() : res.status(403).json(response(false, 'Doctor not part of the meeting'));
            }
            else throw new Error('User not found');
        }
        else {
            throw new Error('Invalid type');
        }
    }
    catch (err) {
        return res.status(400).json(response(false, err));
    }
}