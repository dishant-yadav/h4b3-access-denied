const { Schema, model } = require('mongoose');

const OnlineSchema = new Schema({
    type: { type: String, required: true, enum: ['User', 'Doctor'] },
    refId: { type: Schema.Types.ObjectId, required: true, refPath: 'type' },
}, { collection: 'online', timestamps: true });

OnlineSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 });

module.exports = model('Online', OnlineSchema, 'online');
