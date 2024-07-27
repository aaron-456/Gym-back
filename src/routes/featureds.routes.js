const express = require('express');
const featuredController = require('../controllers/featured.controller');

const router = express.Router();

router
  .route('/')
  .get(featuredController.findAllFeatureds)
  .post(featuredController.addToFeatured);

router.route('/:id').delete(featuredController.deleteFeatured);

module.exports = router;
