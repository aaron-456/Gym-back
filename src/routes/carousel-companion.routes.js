const express = require('express');
const carouselCompanionValidation = require('../validations/carusel_companion.validation');

const carouselCompanion_Controller = require('../controllers/carousel-companion.controller');
const checkAuth = require('../middlewares/auth');
const checkRoleAuth = require('../utils/roleAuth');

const router = express.Router();

router
  .route('/')
  .get(carouselCompanion_Controller.findAllcarousel_companion)
  .post(
    checkAuth,
    checkRoleAuth(['admin']),
    carouselCompanionValidation.createNewsValidation,
    carouselCompanion_Controller.addToCarousel_companion
  )
  .patch(checkAuth, checkRoleAuth('admin'), carouselCompanion_Controller.changeToCarousel_companion)

module.exports = router;
