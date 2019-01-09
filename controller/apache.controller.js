var express = require('express');
var router = express.Router();
var apacheService = require('../service/apache.service');
var config = require('../config.json');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// routes
router.post('/createApache', createApache);

router.post('/deleteApache', deleteApache);

router.get('/getApache', getApache);


module.exports = router;

function createApache(req, res) {
    console.log(req.body);

    
    var domainName = req.body.domainName;
    var biosName = req.body.biosName;
    console.log(domainName+"  "+biosName);
    apacheService.createApache(domainName,biosName)
        .then(function (APACHE) {
            res.status(200).send(APACHE);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
    
    
}

function deleteApache(req, res) {
    console.log(req.body);
    var id = req.body.id;
     var domainName = req.body.domainName;
    var biosName = req.body.biosName;
   // var apacheID = req.body.apacheID;
    apacheService.deleteApache(id,domainName,biosName)
        .then(function (APACHE) {
            res.status(200).send(APACHE);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
   // console.log("ModelName ID to be deleted "+apacheID);
   
    
}

function getApache(req, res) {
    console.log(req.body);
    apacheService.getApache()
        .then(function (APACHE) {
            res.send(APACHE);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
    
    
}