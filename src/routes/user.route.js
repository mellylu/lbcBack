const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const verifyToken = require("../helpers/verifyToken")


router.get('/', userController.getAll);
router.get('/verifyToken', userController.verifyToken);
router.get('/deleteAnnouncementFavoris/:id', userController.deleteAnnouncementFavoris);
router.get('/:id', userController.getId);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/emailexist', userController.emailexist);
router.put('/:id', userController.update);
router.put('/updatepassword/:id', userController.updatepassword);
router.delete('/:id', userController.delete);
router.post("/verifyemail", userController.verifyemail);
router.post("/verifyphone", userController.verifyphone);
router.delete('/deleteAnnouncement/:idUser/:idAd', userController.deleteAnnouncement);
router.delete('/deleteFavoris/:idUser/:idAd', userController.deleteFavoris);



module.exports = router;