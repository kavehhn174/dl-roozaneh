const express = require('express');
const qualityController = require('../controllers/linkController');
const authMiddleware = require('./../middlewares/auth');

const router = new express.Router();



router
    .route('/')
    .get(
        qualityController.getAllLinks
    )

router.use(authMiddleware.protect);

router.route('/').post(
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





















