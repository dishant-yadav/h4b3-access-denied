const { Schema, model } = require('mongoose');

const MeetingSchema = new Schema({
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    pastRecord: [{ type: Schema.Types.ObjectId, ref: 'Prescription' }],

    problem: String,
    name: String,
    age: Number,
    address: String,
    district: String,
    city: String,
    pin: Number,
    state: String,
    gender: String,

}, { collection: 'meeting', timestamps: true });

module.exports = model('Meeting', MeetingSchema, 'meeting');

// ID IS THE MEETING LINK   