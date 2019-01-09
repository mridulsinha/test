var express = require('express');
var router = express.Router();
var adService = require('../service/ad.service');
var openstackDelegate = require('../delegate/openstack.delegate');
var openstackMergeCall = require('../service/openstackMergeCall.service');
var config = require('../config.json');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// routes
router.post('/createAD', createAD);

router.post('/deleteAD', deleteAD);

router.get('/getAD', getAD);


module.exports = router;

function createAD(req, res) {
    console.log(req.body);
    var domainName = req.body.dirDomainName;
    var biosName = req.body.dirNetbiosName;
    var passwordName =  req.body.dirPasswordName
    console.log("fgshdfashkdasghassaksghskfjfkfj"+domainName+"  "+biosName+"  "+passwordName);
   /* adService.createAD(domainName,biosName)
        .then(function (AD) {
            res.status(200).send(AD);
        }) 
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });*/
       // var configurationID = req.body.dirDomainName;
        var configurationID = 1;
        openstackMergeCall.mergeCallOpenstack(configurationID,domainName,biosName,passwordName).then(function (client) {
            res.status(200).send(client);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
}

function deleteAD(req, res) {
    console.log(req.body);

    var id = req.body.id;
    var domainName = req.body.domainName;
    var biosName = req.body.biosName;
    console.log(domainName+"  "+biosName);
    adService.deleteAD(id,domainName,biosName)
        .then(function (AD) {
            
            res.status(200).send(AD);
            
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
   
    
    
}

function getAD(req, res) {
    console.log(req.body);
    adService.getAD()
        .then(function (AD) {
            res.status(200).send(AD);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
    
}