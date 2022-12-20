const express = require('express');
const router = express.Router();
const usersRouter = require('./user.route');
const tokenRouter = require('./token.route');

router.use('/users/', usersRouter);

router.use('/token/', tokenRouter);

module.exports = router;