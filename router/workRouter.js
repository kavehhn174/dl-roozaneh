const express = require('express');
const workController = require('../controllers/workController');
const authMiddleware = require('./../middlewares/auth');

const router = new express.Router();

// router.use(authMiddleware.protect);

router
    .route('/')
    .get(
        workController.getAllWorks
    )
    .post(
        workController.createWork
    );

router
    .route('/:id')
    .get(workController.getWork)
    .patch(
        workController.updateWork
    )
    .delete(
        workController.deleteWork
    );
module.exports = router;
