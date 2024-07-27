const express = require('express');
const carouselController = require('../controllers/carousel.controller');

const router = express.Router();

router
  .route('/')
  .get(carouselController.findAllCarousel)
  .post(carouselController.createCarousel);

router.route('/:id').delete(carouselController.deleteAccordionFindOne);

module.exports = router;
