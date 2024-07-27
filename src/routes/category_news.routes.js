const express = require('express');

const validationMiddleware = require('./../middlewares/validations.middleware');
const category_newsController = require('../controllers/category_news.controller');
const checkAuth = require('../middlewares/auth');
const checkRoleAuth = require('../utils/roleAuth');

const router = express.Router();
router
  .route('/')
  .get(category_newsController.findAllCategory_news)
  .post(
    checkAuth,
    checkRoleAuth(['admin']),
    validationMiddleware.createCategory_NewsValidation,
    category_newsController.createCategory_news
  );

router
  .route('/:id')
  .get(category_newsController.findOneCategory_news)
  .patch(
    checkAuth,
    checkRoleAuth(['admin']),
    validationMiddleware.createCategory_NewsValidation,
    category_newsController.updateCategory_news
  )
  .delete(
    checkAuth,
    checkRoleAuth(['admin']),
    category_newsController.deleteCategory_news
  );

module.exports = router;
