const express = require('express');
const router = express.Router();
const filterController = require('../controllers/filter.controller')

router.get('/element', filterController.getElement);
router.get('/', filterController.getAll);
router.post('/', filterController.post);
router.delete('/:id', filterController.delete);

module.exports = router;