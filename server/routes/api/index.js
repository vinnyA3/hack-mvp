const express = require('express');
const router = express.Router();
const { getGeolocation, getProductInfo } = require('controllers/api');

router.route('/location').get(getGeolocation);
router.route('/:id').get(getProductInfo);

module.exports = router;
