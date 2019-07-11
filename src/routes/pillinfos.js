const { Router } = require('express');
const { NotFound } = require('http-errors');
const { sequelize } = require('../models');

const router = Router();
const pillinfos = require('./pillinfos');

 router.get('/', function(req, res) { // return 
     sequelize.models.pillinfos
     .findAll ({
         where: {
             code: req.params.code,
         },
         include: [
             {
                 model: sequelize.models.pillinfos,
             }
         ]
     })
     .then(users => {
         res.json(users);
     })
     .catch(err => {
        console.log(err);
        res.status(400).json(err);
     })
 });
         

router.post('/', function(req, res) {
    var data = req.body;
    data.code = req.user.code;

    sequelize.models.PillInfo.create(req.body).then(function (result) {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(400).json(err);
    })
});

module.exports = router;
