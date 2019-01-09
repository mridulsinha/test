var config = require('../config.json');
var _ = require('lodash');
//var jwt = require('jsonwebtoken');
//var bcrypt = require('bcryptjs');
var Q = require('q');

//var mysql = require('mysql')

var request = require('request');
var service = {};

service.getOpenstack = getOpenstack;


module.exports = service;

function getOpenstack() {
    
    var deferred = Q.defer();
    console.log("You are in getOpenstack service");
    deferred.resolve("Success");
    
    
    return deferred.promise;
}