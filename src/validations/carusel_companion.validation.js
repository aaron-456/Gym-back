const { body } = require('express-validator');
const validFields = require('./validFields');
const db = require('../../database/models/index');

exports.createNewsValidation = [
  body('new_id')
    .exists()
    .notEmpty()
    .withMessage('new_id cannot be empty')
    .isInt()
    .withMessage('type new_id is Integer '),

  body().custom(async (value, { req }) => {
    const newsCount = await db.carousel_companion.count();
    if (newsCount >= 3) {
      throw new Error('Cannot add more than 3 news');
    }
  }),

  validFields,
];
