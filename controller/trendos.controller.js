var express = require('express');
var router = express.Router();
var trendosService = require('../service/trendos.service');
var config = require('../config.json');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// routes
router.post('/createTRENDOS', createTRENDOS);

router.post('/deleteTRENDOS', deleteTRENDOS);

router.get('/getTRENDOS', getTRENDOS);


module.exports = router;

function createTRENDOS(req, res) {
    console.log(req.body);

    var domainName = req.body.domainName;
    var biosName = req.body.biosName;
    console.log(domainName+"  "+biosName);
    trendosService.createTRENDOS(domainName,biosName)
        .then(function (TRENDOS) {
            res.status(200).send(TRENDOS);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}

function deleteTRENDOS(req, res) {
    console.log(req.body);
    var id = req.body.id;
    var domainName = req.body.domainName;
    var biosName = req.body.biosName;
    //var trendosID = req.body.trendosID;
    trendosService.deleteTRENDOS(id,domainName,biosName)
        .then(function (TRENDOS) {
            res.status(200).send(TRENDOS);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}

function getTRENDOS(req, res) {
    console.log(req.body);
    trendosService.getTRENDOS()
        .then(function (TRENDOS) {
            res.send(TRENDOS);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}