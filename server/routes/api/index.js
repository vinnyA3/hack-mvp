const express = require('express');
const router = express.Router();
const { cacheMiddleware } = require('middleware');
const { getGeolocation, getProductInfo } = require('controllers/api');

router
  .route('/location')
  .all(cacheMiddleware(600))
  .get(getGeolocation);

router.route('/:id').get(getProductInfo);

module.exports = router;
