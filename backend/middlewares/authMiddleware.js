const jwt = require('jsonwebtoken');
const Patient = require('../model/Patient_appointment');
const JWT_SECRET = 'civiryvrbouvbacsvftwflawyf'; 

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.patient = await Patient.findById(decoded.id);
    if (!req.patient) {
      return res.status(404).send('Patient not found.');
    }
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = authMiddleware;
