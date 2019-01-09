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


service.createKerberos = createKerberos;
service.getKerberos = getKerberos;
service.deleteKerberos = deleteKerberos;

module.exports = service;
function createKerberos(domainName,biosName) {
    let dbStatus = "";
    let openstackStatus = ""
    let message = "" ;
    var deferred = Q.defer();
    var queryString = "INSERT INTO dfp.kerberos(domainName,biosName) values('"+domainName+"'"+","+"'"+biosName+"')";
    console.log(queryString);
    try{ 
    con.query(queryString, function(err, rows, fields)  
    { 
      if(err){
        
        dbStatus = "Error";
        openstackStatus = "Error";
        message+= "Error in createKerberos database service";
        deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
        } 
        else {
          
        dbStatus = "Success";
        message+= "Information Saved,";
        openstackDelegate.createKerberos(domainName,biosName)
            .then(function (Kerberos) {
                
                if(Kerberos){
                openstackStatus = "Success";
                message+= "Openstack service created successfully";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
                }
              })
            .catch(function (err) {
                
                openstackStatus = "Error";
                message+= "Error in createKerberos openstack service";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
            });
                
        }
    }); 
    }catch(ex ){
            dbStatus = "Error";
            openstackStatus = "Error";
            message+= "Error in createKerberos database connenction";
            console.log(ex);
            deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
    }finally{
    
    }
    return deferred.promise;
}

function deleteKerberos(id,domainName,biosName) {
    let dbStatus = "";
    let openstackStatus = ""
    let message = "" ;
    var deferred = Q.defer();
    //var queryString = "DELETE FROM dfp.kerberos WHERE  domainName="+"'"+domainName+"'"+" and biosName="+"'"+biosName+"'";
    var queryString = "DELETE FROM dfp.kerberos WHERE  id="+"'"+id+"'";
    console.log(queryString);
    try{ 
    con.query(queryString, function(err, rows, fields)  
    { 
       if(err){
        
        dbStatus = "Error";
        openstackStatus = "Error";
        message+= "Error in deleteKerberos database service";
        deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
        } 
        else {
          
        dbStatus = "Success";
        message+= "Information Deleted,";
        openstackDelegate.deleteKerberos(domainName,biosName)
            .then(function (Kerberos) {
                
                if(Kerberos){
                openstackStatus = "Success";
                message+= "Openstack service deleted successfully";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
                }
              })
            .catch(function (err) {
                
                openstackStatus = "Error";
                message+= "Error in deleteKerberos openstack service";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
            });
                
        }
    }); 
    }catch(ex ){
            dbStatus = "Error";
            openstackStatus = "Error";
            message+= "Error in deleteKerberos database connenction";
            console.log(ex);
            deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
    }finally{
    
    }
    return deferred.promise;
}

function getKerberos() {
    let dbStatus = "";
    let openstackStatus = ""
    let message = "" ;
    var deferred = Q.defer();
    var queryString = "Select * from dfp.kerberos";
    console.log(queryString);
    try{
       con.query(queryString, function(err, rows, fields)  
    { 
      if(err){
        
        dbStatus = "Error";
        openstackStatus = "Error";
        message+= "Error in getKerberos database service";
        deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
        } 
        else {
          
        dbStatus = "Success";
        message+= "Information Retrieved,";
        openstackDelegate.getKerberos()
            .then(function (Kerberos) {
                
                if(Kerberos){
                openstackStatus = "Success";
                message+= "Openstack service retrieved successfully";
                deferred.resolve({"data": rows,"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
                }
              })
            .catch(function (err) {
                
                openstackStatus = "Error";
                message+= "Error in getKerberos openstack service";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
            });
                
        }
    }); 
    }catch(ex ){
            dbStatus = "Error";
            openstackStatus = "Error";
            message+= "Error in getKerberos database connenction";
            console.log(ex);
            deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
    }finally{
    
    }
    return deferred.promise;
}