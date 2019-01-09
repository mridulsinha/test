var express = require('express');
var router = express.Router();
var ldapService = require('../service/ldap.service');
var config = require('../config.json');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// routes
router.post('/createLDAP', createLDAP);

router.post('/deleteLDAP', deleteLDAP);

router.get('/getLDAP', getLDAP);


module.exports = router;

function createLDAP(req, res) {
    console.log(req.body);

    var domainName = req.body.domainName;
    var biosName = req.body.biosName;
    console.log(domainName+"  "+biosName);
    ldapService.createLDAP(domainName,biosName)
        .then(function (LDAP) {
            res.status(200).send(LDAP);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}

function deleteLDAP(req, res) {
    console.log(req.body);
    var id = req.body.id;
     var domainName = req.body.domainName;
    var biosName = req.body.biosName;
    //var ldapID = req.body.ldapID;
    ldapService.deleteLDAP(id,domainName,biosName)
        .then(function (LDAP) {
            res.status(200).send(LDAP);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}

function getLDAP(req, res) {
    console.log(req.body);
    ldapService.getLDAP()
        .then(function (LDAP) {
            res.send(LDAP);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}