const express = require('express');
const router = express.Router();
const { getAllLocations, getLocation } = require('../controllers/locations');

router.get('/', getAllLocations);

router.post('/common', getLocation);

module.exports = router;
