var config = require('../config.json');
var _ = require('lodash');
var Q = require('q');
var mysql = require('mysql');
//var io = require('socket.io').listen(serverHTTP);
var async = require('async');
var uuid = require('uuid');
var pkgcloud = require('pkgcloud');
var fs = require('fs');
var merge = require('merge');
//var Promise = require('Promise');

var request = require('request');
var service = {};

var con = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  port: config.port

});
con.connect(function(err) {
    if (err) {
    console.error('error connecting: ' + err.stack);
    return;
    }
    else{
        console.log("database has been connected");
    }
});

service.mergeCallOpenstack = mergeCallOpenstack;
module.exports = service;

function mergeCallOpenstack(configurationID,domainName,biosName,passwordName){
  
  var APP_NAME = "dfp-ops";
  var PROVIDER = 'openstack';
  var USERNAME = 'hgoyal';
  var PASSWORD = 'HGO_DFP';
  var REGION = 'RegionOne';
    var deferred = Q.defer();
  
  var AUTH_URL = 'http://10.55.65.1:5000/';
    var queryString = "SELECT * FROM dfp.configuration where ConfigurationID =" +"'"+configurationID+"';"
    con.query(queryString, function(err, rows, fields) {
    if (err){ 
        throw err; 
        deferred.resolve("error aa gyi re"+err);                       
    }
        else{
             var array = [];
             array.push(rows[0].Master);
             array.push(rows[0].GlobalEnv);
             array.push(rows[0].Compute);
             array.push(rows[0].Volume); 
             array.push(rows[0].InstallScript);
               
             console.log("After"+array.length);
             var mergedData='';
             for(i in array){  
              let arr = array[i];
              
              mergedData+= arr;
            }
            //console.log(mergedData);
        }
    
    //console.log(mergedData);
    //TEMPLATE_TEST = fs.readFileSync("template", "utf-8");
    //TEMPLATE_AD = fs.readFileSync("D:/MyDFP/Write_Templates/concats1.yaml", "utf-8");; //replace x with the tempelate retrieved from db
   TEMPLATE_AD = mergedData;
     console.log(TEMPLATE_AD);
    console.log("About to create openstack client");
      var openstack_client_orchestration = pkgcloud.orchestration.createClient({
      provider: PROVIDER, // required
      username: USERNAME, // required
      password: PASSWORD, // required 
      region: REGION,
      authUrl: AUTH_URL // required
    });
         console.log("created openstack client" +openstack_client_orchestration);
         //console.log(openstack_client_orchestration);
         //deferred.resolve(openstack_client_orchestration);
    var instanceName = "DC_inst_" + uuid.v4();
    var volumeName = "DC_vol_" + uuid.v4();

    var param1 = domainName;
    var param2 = biosName;
    var param3 = passwordName;

    var Proxy = 'http://10.135.0.29:8080';
    var params = {instancename:instanceName, volumename:volumeName, parameter1:param1, parameter2:param2, parameter3:param3};
    //var params = {instancename:instanceName, volumename:volumeName};
    //var params = {instancename:"DC_inst4", volumename:"DC_vol4"};
    request = {
      name: 'mystack1_AD_mannual_' + uuid.v4(),
      timeout: 30,
      template: TEMPLATE_AD,
      parameters: params
    }; 
    console.log("This is request"+request);

    
    openstack_client_orchestration.createStack(request, function(err, stack) {
      if (err) {
       console.log(err);
        deferred.resolve('Create Active Directory failed');
      } else {
        var temp_data = JSON.stringify(stack);
        console.log(temp_data);
      
        deferred.resolve('Successful creation of ActiveDirectory. Once this process will finish you will have your instance in setups section');
      }
    });
    });
    return deferred.promise;
}

