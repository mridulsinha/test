var express = require('express');
var router = express.Router();
var dfpDataTestservice = require('../service/dfpDataTest.service');
var openstackMergeCall = require('../service/openstackMergeCall.service');
var openstackDelegate = require('../delegate/openstack.delegate');
var config = require('../config.json');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// routes
router.post('/createConfiguration', createConfiguration);

router.post('/getConfiguration', getConfiguration);

router.post('/getOpenstackClient',getOpenstackClient);


module.exports = router;

function createConfiguration(req, res) {
    console.log(req.body);
    var configurationID = req.body.configurationID;
    var configurationType = req.body.configurationType;
    var master = req.body.master;
    var globalEnv = req.body.globalEnv;
    var compute = req.body.compute;
    var volume = req.body.volume;
    var network = req.body.network;
    var installScript = req.body.installScript;

    console.log(configurationID+"  "+configurationType+"  "+master+"  "+globalEnv+"  "+compute+"  "+volume+"  "+network+"  "+installScript);
    dfpDataTestservice.createConfiguration(configurationID,configurationType,master,globalEnv,compute,volume,network,installScript)
        .then(function (configuration) {
            res.status(200).send(configuration);
        }) 
        .catch(function (err) {
            res.status(400).send({status:400, message: 'HEHEerror'});
        });
}

function getConfiguration(req, res) {
    console.log(req.body);
    var configurationID = req.body.configurationID;
    dfpDataTestservice.getConfiguration(configurationID)
        .then(function (configuration) {
            res.status(200).send(configuration);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
    
}

function getOpenstackClient(req, res) {
    console.log("You are in controller");
        var configurationID = req.body.configurationID;
        openstackMergeCall.mergeCallOpenstack(configurationID).then(function (client) {
            res.status(200).send(client);
        })
        .catch(function (err) {
            res.status(400).send({status:400, message: 'error'});
        });
    
}


