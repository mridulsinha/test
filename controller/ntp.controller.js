var express = require('express');
var router = express.Router();
var ntpService = require('../service/ntp.service');
var config = require('../config.json');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// routes
router.post('/createNTP', createNTP);

router.post('/deleteNTP', deleteNTP);

router.get('/getNTP', getNTP);


module.exports = router;

function createNTP(req, res) {
    console.log(req.body);

    var domainName = req.body.domainName;
    var biosName = req.body.biosName;
    console.log(domainName+"  "+biosName);
    ntpService.createNTP(domainName,biosName)
        .then(function (NTP) {
            res.status(200).send(NTP);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}

function deleteNTP(req, res) {
    console.log(req.body);
    var id = req.body.id;
    var domainName = req.body.domainName;
    var biosName = req.body.biosName;
   // var ntpID = req.body.ntpID;
    ntpService.deleteNTP(id,domainName,biosName)
        .then(function (NTP) {
            res.status(200).send(NTP);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}

function getNTP(req, res) {
    console.log(req.body);
    ntpService.getNTP()
        .then(function (NTP) {
            res.send(NTP);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}