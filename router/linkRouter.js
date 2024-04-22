const express = require('express');
const qualityController = require('../controllers/linkController');
const authMiddleware = require('./../middlewares/auth');

const router = new express.Router();

router.use(authMiddleware.protect);

router
    .route('/')
    .get(
        qualityController.getAllLinks
    )
    .post(
        qualityController.createLink
    );

router
    .route('/:id')
    .get(qualityController.getLink)
    .patch(
        qualityController.updateLink
    )
    .delete(
        qualityController.deleteLink
    );
module.exports = router;





















