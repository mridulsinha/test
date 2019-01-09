var express = require('express');
var router = express.Router();
var dnsService = require('../service/dns.service');
var config = require('../config.json');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// routes
router.post('/createDNS', createDNS);

router.post('/deleteDNS', deleteDNS);

router.get('/getDNS', getDNS);


module.exports = router;

function createDNS(req, res) {
    console.log(req.body);

     var domainName = req.body.domainName;
    var biosName = req.body.biosName;
    console.log(domainName+"  "+biosName);
    dnsService.createDNS(domainName,biosName)
        .then(function (DNS) {
            res.status(200).send(DNS);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}

function deleteDNS(req, res) {
    console.log(req.body);
    var id = req.body.id;
    var domainName = req.body.domainName;
    var biosName = req.body.biosName;
    //var dnsID = req.body.dnsID;
    dnsService.deleteDNS(id,domainName,biosName)
        .then(function (DNS) {
            res.status(200).send(DNS);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
   // console.log("DNS ID to be deleted "+dnsID);
    
    
}

function getDNS(req, res) {
    console.log(req.body);
    dnsService.getDNS()
        .then(function (DNS) {
            res.send(DNS);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}