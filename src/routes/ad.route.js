const express = require('express');
const router = express.Router();
const adController = require('../controllers/ad.controller')
//const verifyToken = require('../middleware/verifyToken');

// router.get('/', adController.getAll);
router.get('/', adController.getAll);
router.post('/', adController.post);
router.get('/:id', adController.getId);
router.put('/:id', adController.update);
router.delete('/:id', adController.delete);


module.exports = router;