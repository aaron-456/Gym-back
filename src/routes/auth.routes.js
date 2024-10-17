const express = require('express');

const authController = require('../controllers/auth.controller');
// const validationMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();

router.post(
  '/registerTenat',
  //validationMiddleware.registerUser_Validation,
  authController.registerTenant
);

router.post('/login', authController.loginUser);

module.exports = router;
