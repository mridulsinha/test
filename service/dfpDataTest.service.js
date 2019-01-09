//var config = require('../dfpDataTest.json');
var config = require('../config.json');
var Q = require('q');
var mysql = require('mysql');
var fs = require('fs');
var openstackDelegate = require('../delegate/openstack.delegate');
var mysql = require('mysql')
var concat = require('concat-files');
var request = require('request');
var merge = require('merge');
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

service.createConfiguration = createConfiguration;
service.getConfiguration = getConfiguration;

module.exports = service;

function createConfiguration(configurationID,configurationType,master,globalEnv,compute,volume,network,installScript) {
    let dbStatus = "";
    let openstackStatus = ""
    let message = "" ;
    var deferred = Q.defer();
    var master = fs.readFileSync('D:/MyDFP/templates/hat_template.yaml');
    var compute = fs.readFileSync('D:/MyDFP/templates/res_compute.yaml');
    var globalEnv = fs.readFileSync('D:/MyDFP/templates/res_globalenv.yaml');
    var network = fs.readFileSync('D:/MyDFP/templates/res_network.yaml');
    var installScript = fs.readFileSync('D:/MyDFP/templates/res_script.yaml');
    var volume = fs.readFileSync('D:/MyDFP/templates/res_volume.yaml');
    console.log(globalEnv);
    var queryString = "INSERT INTO dfp.configuration(configurationID,configurationType,master,globalEnv,compute,volume,network,installScript) values('"+configurationID+"'"+","+"'"+configurationType+"',"+"'"+master+"',"+"'"+globalEnv+"',"+"'"+compute+"',"+"'"+volume+"',"+"'"+network+"',"+"'"+installScript+"')";
    console.log(queryString);
   //console.log(con);
    con.query(queryString, function(err, rows, fields)  
    { 
        if(err){
        deferred.resolve("error aa gyi"+err);
         } 
        else {
        dbStatus = "Success";
        openstackStatus = "Not Known";
        message+= "Success in createConfiguration database service";
        deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
        }
    });
    return deferred.promise;
}
function getConfiguration(configurationID) {
    let dbStatus = "";
    let openstackStatus = ""
    let message = "" ;
    var deferred = Q.defer();
    var queryString = "SELECT * FROM dfp.configuration where ConfigurationID =" +"'"+configurationID+"';" 
    con.query(queryString, function(err, rows, fields) {
    if (err){ 
        throw err; 
        deferred.resolve("error aa gyi re"+err);                       
    }
        else{
        //fs.writeFileSync("D:/MyDFP/Write_Templates/GlobalEnv.txt", rows[0].GlobalEnv);
        /*fs.writeFileSync("D:/MyDFP/Write_Templates/Master.yaml", rows[0].Master);
        fs.writeFileSync("D:/MyDFP/Write_Templates/Compute.yaml", rows[0].Compute);    
        fs.writeFileSync("D:/MyDFP/Write_Templates/GlobalEnv.yaml", rows[0].GlobalEnv);
        fs.writeFileSync("D:/MyDFP/Write_Templates/Network.yaml", rows[0].Network);
        fs.writeFileSync("D:/MyDFP/Write_Templates/Script.yaml", rows[0].InstallScript);
        fs.writeFileSync("D:/MyDFP/Write_Templates/Volume.yaml", rows[0].Volume);*/
        var array = [];
        console.log("Before"+ array.length);
        /* for(item in rows[0])
        {
        array.push(item);
        };*/
        
        
       // array.push(rows[0].Master);
        array.push(rows[0].Compute);    
       // array.push(rows[0].GlobalEnv);
       // array.push(rows[0].Network);
       array.push(rows[0].Volume); 
       array.push(rows[0].InstallScript);
       console.log("The template begins.....................");
       console.log(rows[0].Compute);
       console.log(rows[0].Volume);
       console.log(rows[0].InstallScript);
        console.log("After"+array.length);
        //var mergedData = merge(master,compute);
        //console.log("This is merged data" +merge(master,compute));
       /* concat.concat([
                    master,
                    compute,
                    globalEnv
                ], concats);

                console.log(concats); */
           for(i in array){     
          concats = fs.appendFileSync('D:/MyDFP/Write_Templates/concats1.yaml',array[i],encoding='utf8');
           }
          console.log(concats);

        dbStatus = "Success";
        openstackStatus = "Not Known";
        message+= "Success in getConfiguration database service";
        deferred.resolve({"dbstatus":dbStatus,"openstackstatus":openstackStatus, "message": message});
          
        }
    });
     return deferred.promise;
}