const { sequelize } = require('./../postgres/postgres');
const db = require('./../postgres/postgres');
const Tag = db.tag;
const catchAsync = require('./../utils/catchAsync');
const AppError = require("../utils/appError");

exports.createTag = catchAsync(async (req, res, next) => {
    const tag = await Tag.create(req.body);

    res.status(201).json({
        status: 'success',
        data: tag,
    });
});

exports.getAllTags = catchAsync(async (req, res, next) => {
    const tags = await Tag.findAll();

    res.status(201).json({
        status: 'success',
        data: tags,
    });
});

exports.getTag = catchAsync(async (req, res, next) => {
    const tag = await Tag.findOne({where: {id: req.params.id}});

    if (!tag) {
        return next(
            new AppError('Work Not Found', 404)
        );
    }

    res.status(201).json({
        status: 'success',
        data: tag,
    });
});


exports.deleteTag = catchAsync(async (req, res, next) => {
    const tag = await Tag.destroy({
        where: {
            id: req.params.id
        }
    });

    res.status(201).json({
        status: 'success',
    });
});

exports.updateTag = catchAsync(async (req, res, next) => {
    const tag = await Tag.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true,
        plain: true
    });
    res.status(201).json({
        status: 'success',
        data: tag,
    });
});
