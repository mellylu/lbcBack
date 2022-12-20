const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/token.controller')

router.post("/sendEmailToResetPassword", tokenController.sendEmailToResetPassword);
router.post("/formResetPassword", tokenController.formResetPassword);

module.exports = router;