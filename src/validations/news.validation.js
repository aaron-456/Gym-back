const { body } = require('express-validator');
const validFields = require('./validFields');

exports.createNewsValidation = [
  body('news_title')
    .exists()
    .notEmpty()
    .withMessage('news_title cannot be empty')
    .isString()
    .withMessage('type news_title is string'),

  body('news_subtitle')
    .exists()
    .notEmpty()
    .withMessage('news_subtitle cannot be empty')
    .isString()
    .withMessage('type news_subtitle is string'),

  body('news_content')
    .exists()
    .notEmpty()
    .withMessage('news_content cannot be empty')
    .isString()
    .withMessage('type news_content is string'),

  body('categoryId')
    .notEmpty()
    .withMessage('categoryId cannot be empty')
    .isNumeric()
    .withMessage('type categoryId is integer'),
  validFields,
];
