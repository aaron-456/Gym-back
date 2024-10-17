const express = require('express');
const collaboratorController = require('../controllers/collaborator.controller');
const verifyAdmin = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/:id/:schemaName',
  verifyAdmin,
  collaboratorController.resgisterCollaborator
);

module.exports = router;
