const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, unique: true },
    medicalHistory: [{ type: Schema.Types.ObjectId, ref: 'Prescription', default: {} }]
}, { collection: 'user', timestamps: true });

module.exports = model('User', UserSchema, 'user');