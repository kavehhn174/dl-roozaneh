const {promisify} = require("util");
const catchAsync = require('./../utils/catchAsync');
const AppError = require("../utils/appError");

exports.protect = catchAsync(async (req, res, next) => {

    const token = req.query.token;

    if (!token) {
        return next(
            new AppError('Access Denied', 401)
        );
    }

    if (token !== process.env.ACCESS_TOKEN) {
        return next(
            new AppError('Access Denied', 401)
        );
    }

    next();
});
