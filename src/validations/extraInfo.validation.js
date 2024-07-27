const { body, oneOf } = require('express-validator');
const validFields = require('./validFields');

exports.createExtrainfo_Validation = [
  body('extra_title')
    .optional()
    .isString()
    .withMessage('type news_title is string'),

  body('extra_content')
    .optional()
    .isString()
    .withMessage('type extra_content is string'),
  validFields,
];

exports.optionalFieldsValidation = [
  oneOf(
    [
      body('extra_title').notEmpty(),
      body('extra_content').notEmpty(),
      body('img_url').notEmpty(),
    ],
    {
      message: 'Enter at least one of the fields',
      errorType: 'grouped',
    }
  ),
  validFields,
];
