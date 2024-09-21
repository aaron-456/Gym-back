const express = require('express');
const collaboratorController = require('../controllers/collaborator.controller');

const router = express.Router();

router.route('/').post(collaboratorController.resgisterCollaborator);

module.exports = router;
