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


service.createTRENDOS = createTRENDOS;
service.getTRENDOS = getTRENDOS;
service.deleteTRENDOS = deleteTRENDOS;

module.exports = service;
function createTRENDOS(domainName,biosName) {
    let dbStatus = "";
    let openstackStatus = ""
    let message = "" ;
    var deferred = Q.defer();
   /* if(adName=="adName" ){
    console.log("You are in createTRENDOS service");
    deferred.resolve("Success");
    }*/
    console.log(domainName);
    console.log(biosName);
     var queryString = "INSERT INTO dfp.tos(domainName,biosName) values('"+domainName+"'"+","+"'"+biosName+"')";
    console.log(queryString);
    try{ 
    con.query(queryString, function(err, rows, fields)  
    { 
      if(err){
        
        dbStatus = "Error";
        openstackStatus = "Error";
        message+= "Error in createTRENDOS database service";
        deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
        } 
        else {
          
        dbStatus = "Success";
        message+= "Information Saved,";
        openstackDelegate.createTRENDOS(domainName,biosName)
            .then(function (TRENDOS) {
                
                if(TRENDOS){
                openstackStatus = "Success";
                message+= "Openstack service created successfully";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
                }
              })
            .catch(function (err) {
                
                openstackStatus = "Error";
                message+= "Error in createTRENDOS openstack service";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
            });
                
        }
    }); 
    }catch(ex ){
            dbStatus = "Error";
            openstackStatus = "Error";
            message+= "Error in createTRENDOS database connenction";
            console.log(ex);
            deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
    }finally{
    
    }
    return deferred.promise;
}

function deleteTRENDOS(id,domainName,biosName) {
    let dbStatus = "";
    let openstackStatus = ""
    let message = "" ;
    var deferred = Q.defer();
    /*if(trendosID=="trendosID"){
    console.log("You are in deleteTRENDOS service");
    deferred.resolve("Success");
    }*/
    //var queryString = "DELETE FROM dfp.tos WHERE  domainName="+"'"+domainName+"'"+" and biosName="+"'"+biosName+"'";
    var queryString = "DELETE FROM dfp.tos WHERE id="+"'"+id+"'";
    console.log(queryString);
    try{ 
    con.query(queryString, function(err, rows, fields)  
    { 
       if(err){
        
        dbStatus = "Error";
        openstackStatus = "Error";
        message+= "Error in deleteTRENDOS database service";
        deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
        } 
        else {
          
        dbStatus = "Success";
        message+= "Information Deleted,";
        openstackDelegate.deleteTRENDOS(domainName,biosName)
            .then(function (TRENDOS) {
                
                if(TRENDOS){
                openstackStatus = "Success";
                message+= "Openstack service deleted successfully";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
                }
              })
            .catch(function (err) {
                
                openstackStatus = "Error";
                message+= "Error in deleteTRENDOS openstack service";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
            });
                
        }
    }); 
    }catch(ex ){
            dbStatus = "Error";
            openstackStatus = "Error";
            message+= "Error in deleteTRENDOS database connenction";
            console.log(ex);
            deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
    }finally{
    
    }
    return deferred.promise;
}

function getTRENDOS() {
    let dbStatus = "";
    let openstackStatus = ""
    let message = "" ;
    var deferred = Q.defer();
    /*console.log("You are in getTRENDOS service");
    deferred.resolve("Success");*/
    var queryString = "Select * from dfp.tos";
    console.log(queryString);
    try{
       con.query(queryString, function(err, rows, fields)  
    { 
      if(err){
        
        dbStatus = "Error";
        openstackStatus = "Error";
        message+= "Error in getTRENDOS database service";
        deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
        } 
        else {
          
        dbStatus = "Success";
        message+= "Information Retrieved,";
        openstackDelegate.getTRENDOS()
            .then(function (TRENDOS) {
                
                if(TRENDOS){
                openstackStatus = "Success";
                message+= "Openstack service retrieved successfully";
                deferred.resolve({"data": rows,"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
                }
              })
            .catch(function (err) {
                
                openstackStatus = "Error";
                message+= "Error in getTRENDOS openstack service";
                deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
            });
                
        }
    }); 
    }catch(ex ){
            dbStatus = "Error";
            openstackStatus = "Error";
            message+= "Error in getTRENDOS database connenction";
            console.log(ex);
            deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
    }finally{
    
    }
    return deferred.promise;
}