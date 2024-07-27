const express = require('express');

const userController = require('../controllers/user.controller');

const router = express.Router();

router.route('/').get(userController.findAllUsers);
router
  .route('/:id')
  .get(userController.findOneUser)
  .patch(userController.updateUser)
  .delete(userController.deletedUser);

module.exports = router;
