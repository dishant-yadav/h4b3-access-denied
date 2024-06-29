const Meeting = require('../model/MeetingReport');
const User = require('../model/User');
const Online = require('../model/Online');

const getUserById = async (id) => {
    return await User.findById(id);
}

const heartbeat = async (id) => {
    const user = await User.findById(id);

    if (!user) {
        throw new Error('User not found');
    }

    if (await Online.findOne({ type: 'User', refId: user._id })) {
        await Online.findOneAndUpdate({ type: 'User', refId: user._id }, { new: true });
    }
    else {
        await Online.create({ type: 'User', refId: user._id });
    }
    return await Online.findOne({ type: 'Doctor' });
}

const connect = async (user, doctor) => {
    const userData = await User.findOne({ user });

    if (!userData) {
        throw new Error('User not found');
    }
    return await Meeting.create({ doctor: doctor, user: userData._id });
}

module.exports = {
    getUserById,
    heartbeat,
    connect
}