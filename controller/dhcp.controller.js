var express = require('express');
var router = express.Router();
var dhcpService = require('../service/dhcp.service');
var config = require('../config.json');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// routes
router.post('/createDHCP', createDHCP);

router.post('/deleteDHCP', deleteDHCP);

router.get('/getDHCP', getDHCP);


module.exports = router;

function createDHCP(req, res) {
    console.log(req.body);

    var domainName = req.body.domainName;
    var biosName = req.body.biosName;
    console.log(domainName+"  "+biosName);
    dhcpService.createDHCP(domainName,biosName)
        .then(function (DHCP) {
            res.status(200).send(DHCP);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}

function deleteDHCP(req, res) {
    console.log(req.body);
    var id = req.body.id;
    var domainName = req.body.domainName;
    var biosName = req.body.biosName;
    //var dhcpID = req.body.dhcpID;
    
    //console.log("DHCP ID to be deleted "+dhcpID);
    dhcpService.deleteDHCP(id,domainName,biosName)
        .then(function (DHCP) {
            res.status(200).send(DHCP);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
    
}

function getDHCP(req, res) {
    console.log(req.body);
     dhcpService.getDHCP()
        .then(function (DHCP) {
            res.send(DHCP);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}