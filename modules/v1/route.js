const express = require('express');
const router = express.Router();
const common = require('./../../config/common');

const user = require('./user/route');



router.use('/', common.validate_token);
router.use('/user', user);


module.exports = router