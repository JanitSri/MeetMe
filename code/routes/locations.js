const express = require('express');
const router = express.Router();
const { getAllLocations, getLocation } = require('../controllers/locations');

router.get('/', getAllLocations);

router.get('/coordinates', getLocation);

module.exports = router;
