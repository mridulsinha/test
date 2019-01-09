var express = require('express');
var router = express.Router();
var openstackService = require('../service/openstack.service');
var config = require('../config.json');
//var jwt = require('jsonwebtoken');
//var bcrypt = require('bcryptjs');
// routes

router.get('/getOpenstack', getOpenstack);


module.exports = router;

function getOpenstack(req, res) {
    console.log(req.body);
    openstackService.getOpenstack()
        .then(function (openstack) {
            res.send(openstack);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
    
}