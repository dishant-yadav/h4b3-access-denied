// const response = require('../utils/response');

// const authServices = require('../services/authServices')

// const router = require('express').Router();
// const fetchUserDetails = require('../middlewares/fetchUserDetails');

// router.post('/doctor', async (req, res) => {
//     const { email } = req.body;

//     try {
//         const doctor = await authServices.createDoctor(email);

//         return res.json(response(true, { email: doctor.email }));
//     }
//     catch (err) {
//         console.log(err);
//         return res.json(response(false, err));
//     }
// });

// router.post('/otpSend', async (req, res) => {
//     const { email } = req.body;

//     try {
//         const token = await authServices.sendOTP(email);

//         return res.json(response(true, { token: token }));
//     }
//     catch (err) {
//         return res.json(response(false, err));
//     }
// });

// router.post('/verify', async (req, res) => {
//     const { token, otp } = req.body;

//     try {
//         let email = await authServices.verifyOTP(token, otp);

//         return res.json(response(true, { email: email }));
//     } catch (error) {
//         return res.json(response(false, error))
//     }
// });

// router.post('/registration', fetchUserDetails, async (req, res) => {
//     const { email, name, age, problem, address, district, city, pin, state, gender, meetingLink = 'google.com' } = req.body;
//     const user = req.user;

//     try {
//         // TODO: sort all doctors ascending order of queue no.
//         const doctor = (await authServices.searchDocWithShortestQueue())[0];

//         // TODO: create meetingReport
//         let meetingReportBody = { email, name, age, problem, address, district, city, pin, state, gender, doctor: doctor._id, pastRecord: user.medicalHistory, meetingLink }; // append doctorid after getting earliest available doc

//         let meetingReport = await authServices.createMeetingReport(meetingReportBody);

//         let updatedDoctorQueue = await authServices.appendMeetingToDoc(doctor._id, meetingReport._id);

//         // Imp->[query db of doctor with least queue size, and add to it]
//         // it=> meeting schema.;

//         // i=queue size
//         let i = 5;
//         // x=no of mins * i
//         let x = 10 * i;

//         return res.json(response(true, { time: updatedDoctorQueue * 10, meetingReport: meetingReport }));
//     } catch (error) {
//         console.log(error);
//         return res.json(response(false, { error }));
//     }
// });


// router.post('/submit', async (req, res) => {
//     const { meeting_id } = req.body;

//     try {
//         const meetingDetails = await authServices.getMeetingDetails(meeting_id);

//         // makes doctor free
//         await authServices.removeMeetingFromDoc(meetingDetails.doctor);
//         const prescription = await authServices.createPrescription(meetingDetails.email, {});

//         // append Prescription ID to User
//         await authServices.appendPrescriptionToUser(meetingDetails.email, prescription._id);

//         return res.json(response(true));
//     } catch (error) {
//         console.log(error);
//         return res.json(response(false, { error }));
//     }
// });


// module.exports = router;