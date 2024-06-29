const doctorRouter = require('express').Router();
const response = require('../utils/response');
const doctorServices = require('../services/doctorServices');

doctorRouter.get('/heartbeat/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const doctor = await doctorServices.heartbeat(id);

        return res.json(response(true, doctor));
    }
    catch (err) {
        return res.json(response(false, err));
    }
});

doctorRouter.post('/end', async (req, res) => {
    const { meet_id } = req.body;
    const { conversation } = req.body;
    try {

        /* TODO:
        * generate report and get prescription.
        * delete meeting from db collection.
        * const meet = await doctorServices.
        * */

        return res.json(response(true, ""));
    }
    catch (err) {
        return res.json(response(false, err));
    }
})


module.exports = doctorRouter;