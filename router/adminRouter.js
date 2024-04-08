const express = require("express");
const router = new express.Router();
const db = require('./../postgres/postgres');
const Quality = db.quality
router.get('/', async function (req, res) {
    try {
        res.render('admin/admin-default', {template: 'admin-dashboard'});
    }  catch (err) {
        console.log(err);
    }
});

router.get('/add-work', async function (req, res) {
    try {
        res.render('admin/admin-default', {template: 'add-work'});
    }  catch (err) {
        console.log(err);
    }
});

router.get('/work-list', async function (req, res) {
    try {
        res.render('pages/admin/add-work', {});
    }  catch (err) {
        console.log(err);
    }
});

router.get('/quality-list', async function (req, res) {
    const qualities = await Quality.findAll({})
    try {
        res.render('admin/admin-default', {template: 'quality-list', qualities});
    }  catch (err) {
        console.log(err);
    }
});

router.get('/edit-work', async function (req, res) {
    try {
        res.render('pages/admin/add-work', {});
    }  catch (err) {
        console.log(err);
    }
});

module.exports = router;
