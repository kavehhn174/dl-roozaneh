const express = require('express');
const tagController = require('../controllers/tagController');
const authMiddleware = require('./../middlewares/auth');

const router = new express.Router();

// router.use(authMiddleware.protect);

router
    .route('/')
    .get(
        tagController.getAllTags
    )
    .post(
        tagController.createTag
    );

router
    .route('/:id')
    .get(tagController.getTag)
    .patch(
        tagController.updateTag
    )
    .delete(
        tagController.deleteTag
    );
module.exports = router;
