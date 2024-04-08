const express = require('express');
const qualityController = require('../controllers/qualityController');
const authMiddleware = require('./../middlewares/auth');

const router = new express.Router();

// router.use(authMiddleware.protect);

router
    .route('/')
    .get(
        qualityController.getAllQualities
    )
    .post(
        qualityController.createQuality
    );

router
    .route('/:id')
    .get(qualityController.getQuality)
    .patch(
        qualityController.updateQuality
    )
    .delete(
        qualityController.deleteQuality
    );
module.exports = router;
