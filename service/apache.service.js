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


service.createApache = createApache;
service.getApache = getApache;
service.deleteApache = deleteApache;

module.exports = service;
function createApache(domainName,biosName) {
    let dbStatus = "";
    let openstackStatus = ""
    let message = "" ;
    var deferred = Q.defer();
    var queryString = "INSERT INTO dfp.apache(domainName,biosName) values('"+domainName+"'"+","+"'"+biosName+"')";
    console.log(queryString);
    try{ 
    con.query(queryString, function(err, rows, fields)  
    { 
      if(err){
        
        dbStatus = "Error";
        openstackStatus = "Error";
        message+= "Error in createApache database service";
        deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
        } 
        else {
          
        dbStatus = "Success";
        message+= "Information Saved,";
        openstackDelegate.createApache(domainName,biosName)
            .then(function (APACHE) {
                
                if(APACHE){
                openstackStatus = "Success";
                message+= "Openstack service created successfully";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
                }
              })
            .catch(function (err) {
                
                openstackStatus = "Error";
                message+= "Error in createApache openstack service";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
            });
                
        }
    }); 
    }catch(ex ){
            dbStatus = "Error";
            openstackStatus = "Error";
            message+= "Error in createApache database connenction";
            console.log(ex);
            deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
    }finally{
    
    }
    return deferred.promise;
}

function deleteApache(id,domainName,biosName) {
    let dbStatus = "";
    let openstackStatus = ""
    let message = "" ;
    var deferred = Q.defer();
   /* if(apacheID=="apacheID"){
    console.log("You are in deleteApache service");
    deferred.resolve("Success");
    }*/
    
    //var queryString = "DELETE FROM dfp.apache WHERE  domainName="+"'"+domainName+"'"+" and biosName="+"'"+biosName+"'";
    var queryString = "DELETE FROM dfp.apache WHERE id="+"'"+id+"'";
    console.log(queryString);
    try{ 
    con.query(queryString, function(err, rows, fields)  
    { 
       if(err){
        
        dbStatus = "Error";
        openstackStatus = "Error";
        message+= "Error in deleteApache database service";
        deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
        } 
        else {
          
        dbStatus = "Success";
        message+= "Information Deleted,";
        openstackDelegate.deleteApache(domainName,biosName)
            .then(function (APACHE) {
                
                if(APACHE){
                openstackStatus = "Success";
                message+= "Openstack service deleted successfully";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
                }
              })
            .catch(function (err) {
                
                openstackStatus = "Error";
                message+= "Error in deleteApache openstack service";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
            });
                
        }
    }); 
    }catch(ex ){
            dbStatus = "Error";
            openstackStatus = "Error";
            message+= "Error in deleteApache database connenction";
            console.log(ex);
            deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
    }finally{
    
    }
    return deferred.promise;
}

function getApache() {
    let dbStatus = "";
    let openstackStatus = ""
    let message = "" ;
    var deferred = Q.defer();
  /*  console.log("You are in getApache service");
    deferred.resolve("Success");*/
     var queryString = "Select * from dfp.apache";
    console.log(queryString);
    try{
       con.query(queryString, function(err, rows, fields)  
    { 
      if(err){
        
        dbStatus = "Error";
        openstackStatus = "Error";
        message+= "Error in getApache database service";
        deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
        } 
        else {
          
        dbStatus = "Success";
        message+= "Information Retrieved,";
        openstackDelegate.getApache()
            .then(function (APACHE) {
                
                if(APACHE){
                openstackStatus = "Success";
                message+= "Openstack service retrieved successfully";
                deferred.resolve({"data": rows,"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
                }
              })
            .catch(function (err) {
                
                openstackStatus = "Error";
                message+= "Error in getApache openstack service";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
            });
                
        }
    }); 
    }catch(ex ){
            dbStatus = "Error";
            openstackStatus = "Error";
            message+= "Error in getApache database connenction";
            console.log(ex);
            deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
    }finally{
    
    }
    
    return deferred.promise;
}