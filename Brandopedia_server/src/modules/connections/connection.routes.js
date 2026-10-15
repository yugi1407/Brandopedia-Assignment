
const express = require('express');
const connectionController = require('./connection.controller');

const router = express.Router();

router.post('/', connectionController.createConnectionRequest);

module.exports = router;
