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


service.createHyperv = createHyperv;
service.deleteHyperv = deleteHyperv;
service.getHyperv = getHyperv;

module.exports = service;
function createHyperv(domainName,biosName) {
    let dbStatus = "";
    let openstackStatus = ""
    let message = "" ;
    var deferred = Q.defer();
    console.log(domainName,biosName);
    
    console.log(domainName);
    console.log(biosName);
     var queryString = "INSERT INTO dfp.hyperv(domainName,biosName) values('"+domainName+"'"+","+"'"+biosName+"')";
    console.log(queryString);
    try{ 
    con.query(queryString, function(err, rows, fields)  
    { 
      if(err){
        
        dbStatus = "Error";
        openstackStatus = "Error";
        message+= "Error in createHyperv database service";
        deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
        } 
        else {
          
        dbStatus = "Success";
        message+= "Information Saved,";
        openstackDelegate.createHyperv(domainName,biosName)
            .then(function (HYPERV) {
                
                if(HYPERV){
                openstackStatus = "Success";
                message+= "Openstack service created successfully";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
                }
              })
            .catch(function (err) {
                
                openstackStatus = "Error";
                message+= "Error in createHyperv openstack service";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
            });
                
        }
    }); 
    }catch(ex ){
            dbStatus = "Error";
            openstackStatus = "Error";
            message+= "Error in createHyperv database connenction";
            console.log(ex);
            deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
    }finally{
    
    }
    
    return deferred.promise;
}

function deleteHyperv(id,domainName,biosName) {
    let dbStatus = "";
    let openstackStatus = ""
    let message = "" ;
    var deferred = Q.defer();
    //var queryString = "DELETE FROM dfp.hyperv WHERE domainName="+"'"+domainName+"'"+" and biosName="+"'"+biosName+"'";
    var queryString = "DELETE FROM dfp.hyperv WHERE id="+"'"+id+"'";
    console.log(queryString);
    try{ 
    con.query(queryString, function(err, rows, fields)  
    { 
       if(err){
        
        dbStatus = "Error";
        openstackStatus = "Error";
        message+= "Error in deleteHyperv database service";
        deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
        } 
        else {
          
        dbStatus = "Success";
        message+= "Information Deleted,";
        openstackDelegate.deleteHyperv(domainName,biosName)
            .then(function (HYPERV) {
                
                if(HYPERV){
                openstackStatus = "Success";
                message+= "Openstack service deleted successfully";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
                }
              })
            .catch(function (err) {
                
                openstackStatus = "Error";
                message+= "Error in deleteHyperv openstack service";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
            });
                
        }
    }); 
    }catch(ex ){
            dbStatus = "Error";
            openstackStatus = "Error";
            message+= "Error in deleteHyperv database connenction";
            console.log(ex);
            deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
    }finally{
    
    }
    return deferred.promise;
}

function getHyperv() {
    let dbStatus = "";
    let openstackStatus = ""
    let message = "" ;
    var deferred = Q.defer();
    var queryString = "Select * from dfp.hyperv";
    console.log(queryString);
    try{
       con.query(queryString, function(err, rows, fields)  
    { 
      if(err){
        
        dbStatus = "Error";
        openstackStatus = "Error";
        message+= "Error in getHyperv database service";
        deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
        } 
        else {
          
        dbStatus = "Success";
        message+= "Information Retrieved,";
        openstackDelegate.getHyperv()
            .then(function (HYPERV) {
                
                if(HYPERV){
                openstackStatus = "Success";
                message+= "Openstack service retrieved successfully";
                deferred.resolve({"data": rows,"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
                }
              })
            .catch(function (err) {
                
                openstackStatus = "Error";
                message+= "Error in getHyperv openstack service";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
            });
                
        }
    }); 
    }catch(ex ){
            dbStatus = "Error";
            openstackStatus = "Error";
            message+= "Error in getHyperv database connenction";
            console.log(ex);
            deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
    }finally{
    
    }
    
    return deferred.promise;
}