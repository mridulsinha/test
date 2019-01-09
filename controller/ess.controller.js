var express = require('express');
var router = express.Router();
var essService = require('../service/ess.service');
var config = require('../config.json');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// routes
router.post('/createESS', createESS);

router.post('/deleteESS', deleteESS);

router.get('/getESS', getESS);


module.exports = router;

function createESS(req, res) {
    console.log(req.body);

    
    var domainName = req.body.exchangeServerDomainName;
    var biosName = req.body.exchangeServerDomainNetbiosName ;
    console.log(domainName+"  "+biosName);
    essService.createESS(domainName,biosName)
        .then(function (ESS) {
            res.status(200).send(ESS);
            
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}

function deleteESS(req, res) {
    console.log(req.body);

    var id = req.body.id;
    //var essID = req.body.essID;
    var domainName = req.body.domainName;
    var biosName = req.body.biosName ;
    essService.deleteESS(id,domainName,biosName)
        .then(function (ESS) {
            res.status(200).send(ESS);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}

function getESS(req, res) {
    console.log(req.body);
    essService.getESS()
        .then(function (ESS) {
            res.status(200).send(ESS);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}