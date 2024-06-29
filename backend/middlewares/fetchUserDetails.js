const response = require("../utils/response");
const authServices = require('../services/authServices');
module.exports = async (req, res, next) => {
    try {
        const user = await authServices.getUser(req.body.email);

        if (user) {
            req.user = user;
            return next();
        }
        else throw new Error('User not found');
    }
    catch (err) {
        return res.status(400).json(response(false, err));
    }
}