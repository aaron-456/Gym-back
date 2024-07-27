const express = require('express');
const multerUpload = require('../utils/multerUpload');
const newValidation_format= require('../middlewares/validation_fomat_img');
const extraInfoController = require('../controllers/extrainfo.controller');

const extraInfoValidation = require('../validations/extraInfo.validation');



const checkAuth = require('../middlewares/auth');
const checkRoleAuth = require('../utils/roleAuth');

const router = express.Router();

router.use(checkAuth, checkRoleAuth(['admin']));

router
  .route('/:id')
  .post(
    multerUpload,
    newValidation_format.validateFormat,
    extraInfoValidation.createExtrainfo_Validation,
    extraInfoController.createExtraInfo
  )
  .patch(
    multerUpload,
    newValidation_format.validateFormat,
    extraInfoValidation.createExtrainfo_Validation,
    extraInfoController.updateExtrainfo
  )
  .delete(extraInfoController.disableExtrainfoById);

module.exports = router;
