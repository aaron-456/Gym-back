const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createCategory_NewsValidation = [
  body('name')
    .notEmpty()
    .withMessage('name cannot be empty')
    .isString()
    .withMessage('type date is string'),
  validFields,
];

exports.registerUser_Validation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('The name must be a string')
    .isLength({ max: 15 })
    .withMessage('The name must have a maximum of 15 characters'),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isString()
    .withMessage('The password must be a string')
    .isLength({ min: 7 })
    .withMessage('The password must be at least 7 characters'),
  validFields,
];
