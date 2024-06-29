const { Schema, model } = require('mongoose');

const SlotSchema = new Schema({
    date: { //2024/12/03
        type: String,
        required: true
    },
    doctor: { //fbuwe978239
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patient: { //fbuwe978239
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    time: { //02:30
        type: String,
        required: true,
    },
    notes: { // "I have a headache"
        type: String,
        required: false
    },
    appointment: { //fbuwe978239
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
    }
}, { collection: 'slot', timestamps: true });

module.exports = model('Slot', SlotSchema, 'slot');
