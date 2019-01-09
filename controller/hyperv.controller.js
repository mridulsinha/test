var express = require('express');
var router = express.Router();
var hypervService = require('../service/hyperv.service');
var config = require('../config.json');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// routes
router.post('/createHyperv', createHyperv);

router.post('/deleteHyperv', deleteHyperv);

router.get('/getHyperv', getHyperv);


module.exports = router;

function createHyperv(req, res) {
    console.log(req.body);

    
     var domainName = req.body.domainName;
    var biosName = req.body.biosName;
    console.log(domainName+"  "+biosName);
   hypervService.createHyperv(domainName,biosName)
        .then(function (HYPERV) {
            res.status(200).send(HYPERV);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
    
}

function deleteHyperv(req, res) {
    console.log(req.body);

    var id = req.body.id;
    //var hypervID = req.body.hypervID;
    var domainName = req.body.domainName;
    var biosName = req.body.biosName;
    hypervService.deleteHyperv(id,domainName,biosName)
        .then(function (HYPERV) {
            res.status(200).send(HYPERV);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}

function getHyperv(req, res) {
    console.log(req.body);
    hypervService.getHyperv()
        .then(function (HYPERV) {
            res.send(HYPERV);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
    
}