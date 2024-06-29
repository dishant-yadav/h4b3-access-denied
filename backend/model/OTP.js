const { Schema, model } = require('mongoose');

const MeetingSchema = new Schema({
    email: String,
    token: Number,
    otp: Number,

}, { collection: 'otp', timestamps: true, expireAfterSeconds: 300 });

module.exports = model('OTP', MeetingSchema, 'otp');
