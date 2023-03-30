const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const verifyToken = require("../helpers/verifyToken")

router.get('/', userController.getAll);
router.get('/:id', verifyToken, userController.getId);
router.get('/verifytoken', userController.verifyToken);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/emailexist', userController.emailexist);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.post("/verifyemail", userController.verifyemail);
router.post("/verifyphone", userController.verifyphone);
router.delete('/deleteAnnouncement/:idUser/:idAd', userController.deleteAnnouncement);
router.delete('/deleteFavoris/:idUser/:idAd', userController.deleteFavoris);



module.exports = router;