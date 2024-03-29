const { sequelize } = require('./../postgres/postgres');
const db = require('./../postgres/postgres');
const Work = db.work;
const catchAsync = require('./../utils/catchAsync');
const AppError = require("../utils/appError");

exports.createWork = catchAsync(async (req, res, next) => {
    const work = await Work.create(req.body);

    res.status(201).json({
        status: 'success',
        data: work,
    });
});

exports.getAllWorks = catchAsync(async (req, res, next) => {
    const works = await Work.findAll();

    res.status(201).json({
        status: 'success',
        data: works,
    });
});

exports.getWork = catchAsync(async (req, res, next) => {
    const work = await Work.findOne({where: {id: req.params.id}});

    if (!work) {
        return next(
            new AppError('Work Not Found', 404)
        );
    }

    res.status(201).json({
        status: 'success',
        data: work,
    });
});


exports.deleteWork = catchAsync(async (req, res, next) => {
    const work = await Work.destroy({
        where: {
            id: req.params.id
        }
    });

    res.status(201).json({
        status: 'success',
    });
});

exports.updateWork = catchAsync(async (req, res, next) => {
    const work = await Work.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true,
        plain: true
    });
    res.status(201).json({
        status: 'success',
        data: work,
    });
});
