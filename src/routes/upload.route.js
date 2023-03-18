const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller')
const multer = require('multer')
var upload = multer()

router.post('/uploadfile/:folder', upload.single("file"), uploadController.uploadFile);
router.post('/uploadPhotoUser', upload.single("file"), uploadController.uploadPhotoUser);
router.delete('/annonces/:id', uploadController.deleteFile);

module.exports = router;