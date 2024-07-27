const upload = require('./multer');

const multerUpload = upload.fields([{ name: 'img_url', maxCount: 1 }]);

module.exports = multerUpload;
