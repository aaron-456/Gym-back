const express = require('express');

const newsValidation = require('../validations/news.validation');
const newsController = require('../controllers/new.controller');
const checkAuth = require('../middlewares/auth');
const checkRoleAuth = require('../utils/roleAuth');
const multerUpload = require('../utils/multerUpload');
const newValidation_format= require('../middlewares/validation_fomat_img');

const router = express.Router();

router
  .route('/')
  .get(newsController.findAllNews)
  .post(
    checkAuth,
    checkRoleAuth(['admin']),
    multerUpload,
    newValidation_format.validateFormat,
    newsValidation.createNewsValidation,
    newsController.createNews
  );

router
  .route('/:id')
  .get(newsController.findOneNews)
  .patch(checkAuth, checkRoleAuth(['admin']), multerUpload, newValidation_format.validateFormat, newsController.updateNews)
  .delete(checkAuth, checkRoleAuth(['admin']), newsController.deleteNews);

router.patch(
  '/:id/publish',
  checkAuth,
  checkRoleAuth(['admin']),
  newsController.publishNew
);

module.exports = router;
