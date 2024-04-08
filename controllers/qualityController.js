const { sequelize } = require('./../postgres/postgres');
const db = require('./../postgres/postgres');
const Quality = db.quality;
const catchAsync = require('./../utils/catchAsync');
const AppError = require("../utils/appError");

exports.createQuality = catchAsync(async (req, res, next) => {
    const quality = await Quality.create(req.body);

    res.status(201).json({
        status: 'success',
        data: quality,
    });
});

exports.getAllQualities = catchAsync(async (req, res, next) => {
    const qualities = await Quality.findAll();

    res.status(201).json({
        status: 'success',
        data: qualities,
    });
});

exports.getQuality = catchAsync(async (req, res, next) => {
    const quality = await Quality.findOne({where: {id: req.params.id}});

    if (!quality) {
        return next(
            new AppError('Work Not Found', 404)
        );
    }

    res.status(201).json({
        status: 'success',
        data: quality,
    });
});


exports.deleteQuality = catchAsync(async (req, res, next) => {
    const quality = await Quality.destroy({
        where: {
            id: req.params.id
        }
    });

    res.status(201).json({
        status: 'success',
    });
});

exports.updateQuality = catchAsync(async (req, res, next) => {
    const quality = await Quality.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true,
        plain: true
    });
    res.status(201).json({
        status: 'success',
        data: quality,
    });
});
