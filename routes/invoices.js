const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async(req, res, next) => {
    try {
        const results = await db.query('SELECT * FROM invoices');
        return res.json(results)
    } catch (error) {
        return next(e);
    }
})


router.get('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;

        const results = await db.query('SELECT * FROM companies WHERE id 0 = $1', [id]);
        return res.json(results)
    } catch (error) {
        return next(error);
    }
})