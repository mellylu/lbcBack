const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller')
const multer = require('multer')
var upload = multer()

router.post('/uploadfile', upload.single("file"), uploadController.uploadFile);
router.delete('/annonces/:id', uploadController.deleteFile);

module.exports = router;