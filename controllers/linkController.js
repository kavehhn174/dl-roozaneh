const { sequelize } = require('./../postgres/postgres');
const db = require('./../postgres/postgres');
const Link = db.link;
const catchAsync = require('./../utils/catchAsync');
const AppError = require("../utils/appError");

exports.createLink = catchAsync(async (req, res, next) => {
    const link = await Link.create(req.body);

    res.status(201).json({
        status: 'success',
        data: link,
    });
});

exports.getAllLinks = catchAsync(async (req, res, next) => {
    const links = await Link.findAll();

    res.status(201).json({
        status: 'success',
        data: links,
    });
});

exports.getLink = catchAsync(async (req, res, next) => {
    const link = await Link.findOne({where: {id: req.params.id}});

    if (!link) {
        return next(
            new AppError('Work Not Found', 404)
        );
    }

    res.status(201).json({
        status: 'success',
        data: link,
    });
});


exports.deleteLink = catchAsync(async (req, res, next) => {
    const link = await Link.destroy({
        where: {
            id: req.params.id
        }
    });

    res.status(201).json({
        status: 'success',
    });
});

exports.updateLink = catchAsync(async (req, res, next) => {
    const link = await Link.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true,
        plain: true
    });
    res.status(201).json({
        status: 'success',
        data: link,
    });
});
