var express = require('express');
var router = express.Router();
var kerberosService = require('../service/kerberos.service');
var config = require('../config.json');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// routes
router.post('/createKerberos', createKerberos);

router.post('/deleteKerberos', deleteKerberos);

router.get('/getKerberos', getKerberos);


module.exports = router;

function createKerberos(req, res) {
    console.log(req.body);

    var domainName = req.body.domainName;
    var biosName = req.body.biosName;
    console.log(domainName+"  "+biosName);
    kerberosService.createKerberos(domainName,biosName)
        .then(function (Kerberos) {
            res.status(200).send(Kerberos);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}

function deleteKerberos(req, res) {
    console.log(req.body);
    var id = req.body.id;
    var domainName = req.body.domainName;
    var biosName = req.body.biosName;
   // var kerberosID = req.body.kerberosID;
    kerberosService.deleteKerberos(id,domainName,biosName)
        .then(function (Kerberos) {
            res.status(200).send(Kerberos);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}

function getKerberos(req, res) {
    console.log(req.body);
    kerberosService.getKerberos()
        .then(function (Kerberos) {
            res.send(Kerberos);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}