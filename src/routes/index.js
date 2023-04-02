const express = require('express');
const router = express.Router();
const usersRouter = require('./user.route');
const tokenRouter = require('./token.route');
const adRouter = require('./ad.route');
const filterRouter = require('./filter.route');
const uploadRouter = require('./upload.route');
const stripeRouter = require('./stripe.route')

router.use('/users/', usersRouter);
router.use('/ad/', adRouter);
router.use('/token/', tokenRouter);
router.use('/filter/', filterRouter);
router.use('/upload/', uploadRouter);
router.use('/stripe/', stripeRouter);

module.exports = router;