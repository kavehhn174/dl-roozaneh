const { sequelize } = require('./../postgres/postgres');
const db = require('./../postgres/postgres');
const Season = db.season;
const catchAsync = require('./../utils/catchAsync');
const AppError = require("../utils/appError");

exports.createTag = catchAsync(async (req, res, next) => {
    const season = await Season.create(req.body);

    res.status(201).json({
        status: 'success',
        data: season,
    });
});

exports.getAllTags = catchAsync(async (req, res, next) => {
    const seasons = await Season.findAll();

    res.status(201).json({
        status: 'success',
        data: seasons,
    });
});

exports.getTag = catchAsync(async (req, res, next) => {
    const season = await Season.findOne({where: {id: req.params.id}});

    if (!season) {
        return next(
            new AppError('Work Not Found', 404)
        );
    }

    res.status(201).json({
        status: 'success',
        data: season,
    });
});


exports.deleteTag = catchAsync(async (req, res, next) => {
    const season = await Season.destroy({
        where: {
            id: req.params.id
        }
    });

    res.status(201).json({
        status: 'success',
    });
});

exports.updateTag = catchAsync(async (req, res, next) => {
    const season = await Season.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true,
        plain: true
    });
    res.status(201).json({
        status: 'success',
        data: season,
    });
});
