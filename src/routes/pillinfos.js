const { Router } = require('express');
const { NotFound } = require('http-errors');
const { sequelize } = require('../models');

const router = Router();
const pillinfos = require('./pillinfos');

router.get('/', function(req, res) { // return 
    sequelize.models.pillinfos
    .find({
        where: {
            code: req.params.code
        },
        include: [
            {
                model: sequelize.models.
            }
        ]
    })
})