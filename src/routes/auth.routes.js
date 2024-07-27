const express = require('express');

const authController = require('../controllers/auth.controller');
const checkAuth = require('../middlewares/auth');
const validationMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();

router.post(
  '/register',
  validationMiddleware.registerUser_Validation,
  authController.registerUsers
);

router.post('/login', authController.loginUsers);
router.post('/logout', checkAuth, authController.logoutUser);

module.exports = router;
