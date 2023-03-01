const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async(req, res, next) => {
    try {
        const results = await db.query('SELECT * FROM companies');
        return res.json(results)
    } catch (error) {
        return next(error);
    }
})
router.get('/:code', async(req, res, next) => {
    try {
        let code = req.params.code;

        const results = await db.query('SELECT * FROM companies WHERE code = $1', [code]);
        return res.json(results)
    } catch (error) {
        return next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {code, name, description} = req.body;

        const results = await db.query(
            `INSERT INTO companies (code, name, description) 
            VALUES ($1, $2, $3) 
            RETURNING code, name, description`, [code, name, description]
        );
        return res.json({"company": results.rows[0]})
    } catch (error) {
        return next(error);
    }
})

router.put('/:code', async (req, res, next) => {
    try {
        const {name, description} = req.body;
        let code = req.params.code;

        const results = await db.query(
            `UPDATE companies
            SET name = $2, description = $3
            WHERE code = $1
            RETURNING code, name, description`, [code, name, description]
        );
        return res.json({"company": results.rows[0]})
    } catch (error) {
        return next(error);
    }
})

router.delete('/:code', async (req, res, next) => {
    try {

        let code = req.params.code;
        const results = await db.query(
            `DELETE FROM companies
            WHERE code = $1`, [code]
        );
        return res.json({status: "deleted"})
    } catch (error) {
        return next(error);
    }
})



module.exports = router;