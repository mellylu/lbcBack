const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripe.controller')

router.post("/createSession", stripeController.createSession);

module.exports = router;

