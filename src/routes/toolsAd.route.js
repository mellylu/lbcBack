const express = require('express');
const router = express.Router();
const toolsAdController = require('../controllers/toolsAd.controller')

router.get('/', toolsAdController.getElement);
router.post('/', toolsAdController.post);

module.exports = router;