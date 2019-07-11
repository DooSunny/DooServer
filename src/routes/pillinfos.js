const { Router } = require('express');
const { NotFound } = require('http-errors');
const { sequelize } = require('../models');

const router = express.Router();
const pillinfos = require('./pillinfos');

router.get('/', function(req, res) { // return  model pillinfo
    sequelize.models.pillinfos
    .findAll({
        where: {
            code: req.params.code,
        },
        include: [
            {
                model: sequelize.models.pillinfos,
            }
        ]
    })
    .then((pillinfos) => {
        res.json(pillinfos);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});