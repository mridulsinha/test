var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var openstackDelegate = require('../delegate/openstack.delegate');
var mysql = require('mysql')

var request = require('request');
var service = {};

var con = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  port: config.port

});


service.createAD = createAD;
service.getAD = getAD;
service.deleteAD = deleteAD;

module.exports = service;

function createAD(domainName,biosName) {
    let dbStatus = "";
    let openstackStatus = ""
    let message = "" ;
    var deferred = Q.defer();
    var queryString = "INSERT INTO dfp.activedirectory(domainName,biosName) values('"+domainName+"'"+","+"'"+biosName+"')";
    console.log(queryString);
    try{ 
    con.query(queryString, function(err, rows, fields)  
    { 
        if(err){
        
        dbStatus = "Error";
        openstackStatus = "Error";
        message+= "Error in createAD database service";
        deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
        } 
        else {
          
        dbStatus = "Success";
        message+= "Information Saved,";
        openstackDelegate.createAD(domainName,biosName)
            .then(function (AD) {
                
                if(AD){
                openstackStatus = "Success";
                message+= "Openstack service created successfully";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
                }
              })
            .catch(function (err) {
                
                openstackStatus = "Error";
                message+= "Error in createAD openstack service";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
            });
                
        }
      }); 
     }catch(ex ){
            dbStatus = "Error";
            openstackStatus = "Error";
            message+= "Error in createAD database connenction";
            console.log(ex);
            deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
    }finally{
    
    }
    return deferred.promise;
}

function deleteAD(id,domainName,biosName) {
    let dbStatus = "";
    let openstackStatus = ""
    let message = "" ;
    var deferred = Q.defer();
    //var queryString = "DELETE FROM dfp.activedirectory WHERE domainName="+"'"+domainName+"'"+" and biosName="+"'"+biosName+"'";
    var queryString = "DELETE FROM dfp.activedirectory WHERE id="+"'"+id+"'";
    console.log(queryString);
    try{ 
    con.query(queryString, function(err, rows, fields)  
    {
        if(err){
        
        dbStatus = "Error";
        openstackStatus = "Error";
        message+= "Error in deleteAD database service";
        deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
        } 
        else {
          
        dbStatus = "Success";
        message+= "Information Deleted,";
        openstackDelegate.deleteAD(domainName,biosName)
            .then(function (AD) {
                
                if(AD){
                openstackStatus = "Success";
                message+= "Openstack service deleted successfully";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
                }
              })
            .catch(function (err) {
                
                openstackStatus = "Error";
                message+= "Error in deleteAD openstack service";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
            });
                
        }
    }); 
    }catch(ex ){
            dbStatus = "Error";
            openstackStatus = "Error";
            message+= "Error in deleteAD database connenction";
            console.log(ex);
            deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
    }finally{
    
    }
    return deferred.promise;
}

function getAD() {
    let dbStatus = "";
    let openstackStatus = ""
    let message = "" ;
    var deferred = Q.defer();
    var queryString = "Select * from dfp.activedirectory";
    console.log(queryString);
    try{
       con.query(queryString, function(err, rows, fields)  
    { 
      if(err){
        
        dbStatus = "Error";
        openstackStatus = "Error";
        message+= "Error in getAD database service";
        deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
        } 
        else {
          
        dbStatus = "Success";
        message+= "Information Retrieved,";
        openstackDelegate.getAD()
            .then(function (AD) {
                
                if(AD){
                openstackStatus = "Success";
                message+= "Openstack service retrieved successfully";
                deferred.resolve({"data": rows,"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
                }
              })
            .catch(function (err) {
                
                openstackStatus = "Error";
                message+= "Error in getAD openstack service";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
            });
                
        }
    }); 
    }catch(ex ){
            dbStatus = "Error";
            openstackStatus = "Error";
            message+= "Error in getAD database connenction";
            console.log(ex);
            deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
    }finally{
    
    }
    return deferred.promise;
}