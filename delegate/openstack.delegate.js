//var config = require('../config.json');
var _ = require('lodash');
//var jwt = require('jsonwebtoken');
//var bcrypt = require('bcryptjs');
var Q = require('q');
//var openstackDelegate = require('../delegate/openstack.delegate');
var mysql = require('mysql')

var request = require('request');
var openstackDelegate = {};

openstackDelegate.createAD = createAD;
openstackDelegate.getAD = getAD;
openstackDelegate.deleteAD = deleteAD;

openstackDelegate.createESS = createESS;
openstackDelegate.getESS = getESS;
openstackDelegate.deleteESS = deleteESS;

openstackDelegate.createHyperv = createHyperv;
openstackDelegate.getHyperv = getHyperv;
openstackDelegate.deleteHyperv = deleteHyperv;

openstackDelegate.createKerberos = createKerberos;
openstackDelegate.getKerberos = getKerberos;
openstackDelegate.deleteKerberos = deleteKerberos;

openstackDelegate.createApache = createApache;
openstackDelegate.getApache = getApache;
openstackDelegate.deleteApache = deleteApache;

openstackDelegate.createDHCP = createDHCP;
openstackDelegate.getDHCP = getDHCP;
openstackDelegate.deleteDHCP = deleteDHCP;

openstackDelegate.createDNS = createDNS;
openstackDelegate.getDNS = getDNS;
openstackDelegate.deleteDNS = deleteDNS;

openstackDelegate.createLDAP = createLDAP;
openstackDelegate.getLDAP = getLDAP;
openstackDelegate.deleteLDAP = deleteLDAP;

openstackDelegate.createNTP = createNTP;
openstackDelegate.getNTP = getNTP;
openstackDelegate.deleteNTP = deleteNTP;

openstackDelegate.createTRENDOS = createTRENDOS;
openstackDelegate.getTRENDOS = getTRENDOS;
openstackDelegate.deleteTRENDOS = deleteTRENDOS;
module.exports = openstackDelegate;

function createAD(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack createAD delegate");
    console.log("Success Openstack createAD delegate");  

     return deferred.promise;
}

function deleteAD(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack deleteAD delegate");
    console.log("Success Openstack deleteAD delegate");  

     return deferred.promise;
}

function getAD() {
    
    var deferred = Q.defer();
    deferred.resolve("Success Openstack getAD delegate");
    console.log("Success Openstack getAD delegate");  

     return deferred.promise;
}

function createESS(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack createESS delegate");
    console.log("Success Openstack createESS delegate");  

     return deferred.promise;
}

function deleteESS(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack deleteESS delegate");
    console.log("Success Openstack deleteESS delegate");  

     return deferred.promise;
}

function getESS() {
    
    var deferred = Q.defer();
    deferred.resolve("Success Openstack getESS delegate");
    console.log("Success Openstack getESS delegate");  

     return deferred.promise;
}

function createHyperv(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack createHyperv delegate");
    console.log("Success Openstack createHyperv delegate");  

     return deferred.promise;
}

function deleteHyperv(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack deleteHyperv delegate");
    console.log("Success Openstack deleteHyperv delegate");  

     return deferred.promise;
}

function getHyperv() {
    
    var deferred = Q.defer();
    deferred.resolve("Success Openstack getHyperv delegate");
    console.log("Success Openstack getHyperv delegate");  

     return deferred.promise;
}

function createKerberos(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack createKerberos delegate");
    console.log("Success Openstack createKerberos delegate");  

     return deferred.promise;
}

function deleteKerberos(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack deleteKerberos delegate");
    console.log("Success Openstack deleteKerberos delegate");  

     return deferred.promise;
}

function getKerberos() {
    
    var deferred = Q.defer();
    deferred.resolve("Success Openstack getKerberos delegate");
    console.log("Success Openstack getKerberos delegate");  

     return deferred.promise;
}

function createApache(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack createApache delegate");
    console.log("Success Openstack createApache delegate");  

     return deferred.promise;
}

function deleteApache(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack deleteApache delegate");
    console.log("Success Openstack deleteApache delegate");  

     return deferred.promise;
}

function getApache() {
    
    var deferred = Q.defer();
    deferred.resolve("Success Openstack getApache delegate");
    console.log("Success Openstack getApache delegate");  

     return deferred.promise;
}

function createDHCP(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack createDHCP delegate");
    console.log("Success Openstack createDHCP delegate");  

     return deferred.promise;
}

function deleteDHCP(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack deleteDHCP delegate");
    console.log("Success Openstack deleteDHCP delegate");  

     return deferred.promise;
}

function getDHCP() {
    
    var deferred = Q.defer();
    deferred.resolve("Success Openstack getDHCP delegate");
    console.log("Success Openstack getDHCP delegate");  

     return deferred.promise;
}

function createDNS(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack createDNS delegate");
    console.log("Success Openstack createDNS delegate");  

     return deferred.promise;
}

function deleteDNS(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack deleteDNS delegate");
    console.log("Success Openstack deleteDNS delegate");  

     return deferred.promise;
}

function getDNS() {
    
    var deferred = Q.defer();
    deferred.resolve("Success Openstack getDNS delegate");
    console.log("Success Openstack getDNS delegate");  

     return deferred.promise;
}

function createLDAP(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack createLDAP delegate");
    console.log("Success Openstack createLDAP delegate");  

     return deferred.promise;
}

function deleteLDAP(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack deleteLDAP delegate");
    console.log("Success Openstack deleteLDAP delegate");  

     return deferred.promise;
}

function getLDAP() {
    
    var deferred = Q.defer();
    deferred.resolve("Success Openstack getLDAP delegate");
    console.log("Success Openstack getLDAP delegate");  

     return deferred.promise;
}

function createNTP(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack createNTP delegate");
    console.log("Success Openstack createNTP delegate");  

     return deferred.promise;
}

function deleteNTP(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack deleteNTP delegate");
    console.log("Success Openstack deleteNTP delegate");  

     return deferred.promise;
}

function getNTP() {
    
    var deferred = Q.defer();
    deferred.resolve("Success Openstack getNTP delegate");
    console.log("Success Openstack getNTP delegate");  

     return deferred.promise;
}

function createTRENDOS(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack createTRENDOS delegate");
    console.log("Success Openstack createTRENDOS delegate");  

     return deferred.promise;
}

function deleteTRENDOS(domainName,biosName) {
    
    var deferred = Q.defer();
    console.log(domainName);
    console.log(biosName);
    deferred.resolve("Success Openstack deleteTRENDOS delegate");
    console.log("Success Openstack deleteTRENDOS delegate");  

     return deferred.promise;
}

function getTRENDOS() {
    
    var deferred = Q.defer();
    deferred.resolve("Success Openstack getTRENDOS delegate");
    console.log("Success Openstack getTRENDOS delegate");  

     return deferred.promise;
}