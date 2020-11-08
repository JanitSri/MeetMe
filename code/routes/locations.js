const express = require('express');
const router = express.Router();
const { getAllLocations, getLocation } = require('../controllers/locations');

router.get('/', getAllLocations);

router.get('/common', getLocation);

module.exports = router;
