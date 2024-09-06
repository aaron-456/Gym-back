const express = require('express');

const authController = require('../controllers/auth.controller');
// const checkAuth = require('../middlewares/auth');
// const validationMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();

router.post(
  '/registerTenat',
  //validationMiddleware.registerUser_Validation,
  authController.registerTenant
);

/*router.post('/login', authController.loginUsers);
router.post('/loginSA', authController.loginSuper_admin);
router.post('/logout', checkAuth, authController.logoutUser); */

module.exports = router;
