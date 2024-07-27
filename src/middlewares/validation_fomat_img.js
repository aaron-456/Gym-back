const catchAsync = require("../utils/cachAsync");



exports.validateFormat = catchAsync(async (req, res, next) => {
    if (req.files && req.files.img_url && req.files.img_url.length > 0) {
        let info = req.files.img_url[0].originalname.split(".");
        if (!(info[info.length - 1] == "png" || info[info.length - 1] == "jpg" || info[info.length - 1] == "jpeg")) {
            return res.status(400).json({
                message: 'Formato incorrecto, solo puedes usar png, jpg o jpeg',
            });
        }
    }
    next();
});