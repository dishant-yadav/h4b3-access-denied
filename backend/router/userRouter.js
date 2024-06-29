const userRouter = require('express').Router();
const response = require('../utils/response');
const userServices = require('../services/userServices');
const doctorServices = require('../services/doctorServices');


userRouter.get('/heartbeat/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userServices.heartbeat(id);

        return res.json(response(true, user));
    }
    catch (err) {
        return res.json(response(false, err));
    }
});

userRouter.post('/connect', async (req, res) => {
    const { doctor } = req.query;
    const { userid } = req.body;

    try {
        const isAvailable = await doctorServices.isAvailable(doctor);

        if (!isAvailable) {
            return res.json(response(false, 'Doctor is not available. Try again later'));
        }
        else {
            // doc is available
            const meet = await userServices.connect(userid, doctor);
            return res.json(response(true, meet));
            // return res.json(response(true, 'Doctor is available. Connecting'));
        }
    }
    catch (err) {
        console.log(err);
        return res.json(response(false, err));
    }
});

module.exports = userRouter;