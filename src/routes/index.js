const express = require('express');
const router = express.Router();
const usersRouter = require('./user.route');
const tokenRouter = require('./token.route');
const adRouter = require('./ad.route');
const toolsAdRouter = require('./toolsAd.route');

router.use('/users/', usersRouter);
router.use('/ad/', adRouter);
router.use('/token/', tokenRouter);
router.use('/toolsAd/', toolsAdRouter);

module.exports = router;