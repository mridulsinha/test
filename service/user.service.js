var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

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


service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.getDetails=getDetails;
service.resetPassword = _resetPassword;

module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer(); 
    try{
    con.query("select count(*) as userCount from dfp.authenticates where username =" +"'"+username+"';",function(err,rows,fields)
        {  
            try{        userCount = rows[0].userCount;
                        console.log("This is the userCount " +" " +userCount);
                        if(userCount == 1)
                            {

                                con.query("select password as userPassword from dfp.authenticates where username =" +"'"+username+"';",function(err,rows,fields)
                                {
                                userPassword = rows[0].userPassword;
                                
                                var passwordIsValid = bcrypt.compareSync(password, userPassword);
                                
                                        if(passwordIsValid)
                                            {
                                        
                                                            console.log("we will create JWT Token now");
                                                            
                                                            var token = jwt.sign({ id: username }, config.secret, {expiresIn: 86400 });
                                                            
                                                            deferred.resolve({ auth: true, token: token });
                                        
                                            }
                                        else{
                                                            deferred.resolve({ auth: false, token: null });
                                            }
                                });
                            }

                        else{
                            deferred.resolve({ auth: false, token: null });
                            }
                }catch(ex){
                        console.log(ex);
                        
                }
                finally{

                }
       
        });
        }           catch(ex){
                        console.log(ex);
                        
                        }
                finally{

                } 
    
    
    return deferred.promise;
        
   
    
}

function getAll() {
    
    var deferred = Q.defer();

    con.query('select * from dfp.users;', function(err, rows, fields)  
    { 
       console.log(rows); 
       deferred.resolve(JSON.stringify(rows));
    }); 
     
    return deferred.promise;
}

function getById(_id) {
    console.log(_id)
    var deferred = Q.defer();
    /*
    db.authenticates.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });
    */
    var deferred = Q.defer();
    const getUserByidQuery = client.query("select * from budget_schema.authenticates where _id = "+"'"+_id+"'");
    getUserByidQuery.on("row", function (row, user) {
        user.addRow(row);
     
    });
    
    getUserByidQuery.on("end", function (user) {
       console.log(JSON.stringify(user.rows))
     
      client.end();
      deferred.resolve(JSON.stringify(user.rows));
    });



    return deferred.promise;
}

function create(user_name,first_name,last_name,email_id,project_name,password,role) {
    console.log(user_name+"  "+first_name+"  "+last_name+" "+email_id+" "+project_name+""+password +""+role);

    var deferred = Q.defer();
    
    //createuser();
    /** validation
    db.authenticates.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.password = bcrypt.hashSync(userParam.password, 10);

        db.authenticates.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }
    */

    /* updated code below */
   /* const insertQuery = client.query("INSERT INTO dfp.users(user_name,firstname, lastname) values("+"'"+user_name+"',"+"'"+first_name+"',"+"'"+last_name+"')" );
        console.log(insertQuery);
         insertQuery.on('end', () => { client.end();
       });
   */
   /*latest code block which was changed nov
    var queryString = "INSERT INTO dfp.users(user_name,firstname, lastname, emailid, mobileno, current_address, city) values("+user_name+","+first_name+","+last_name+","+email_id+","+mobile_no+","+current_address+","+city+")";
    console.log(queryString);
       con.query(queryString, function(err, rows, fields)  
    { 
      if(err) throw err;
    
    }); */
    var user_id;
    var user_id_query = con.query('select max(user_id) as userid  from dfp.users;', function(err, rows, fields)  
    { 
      if(err){
          console.log(err);
      }else{
        console.log(rows[0].userid);
        user_id = rows[0].userid + 1;
        console.log(user_id);
        var queryString = "INSERT INTO dfp.users(user_id,user_name,firstname, lastname, emailid, projectname,user_type) values("+user_id+","+"'"+user_name+"'"+","+"'"+first_name+"'"+","+"'"+last_name+"'"+","+"'"+email_id+"'"+",'"+project_name+"','"+role+"')";
        console.log(queryString);
        con.query(queryString, function(err, rows, fields)  
        { 
        if(err) throw err;
        else{
            var queryStringAuthenticates = "INSERT INTO dfp.authenticates(username,password) values('"+user_name+"'"+","+"'"+password+"')";
                   console.log(queryStringAuthenticates);  
            con.query(queryStringAuthenticates, function(err, rows, fields)  
                        { 
                            if(err) throw err;
                            else{deferred.resolve(JSON.stringify(rows));}
                                /*console.log("we will create JWT Token now");
                                console.log(rows);
                                var token = jwt.sign({ id: user_name }, config.secret, {expiresIn: 86400 });
                                console.log(token);
                                //deferred.resolve(JSON.stringify(rows));
                                deferred.resolve({ auth: true, token: token })}*/
                        });
                     
            }
    }); 
            }
    }); 
    
    return deferred.promise;



   
}

function getDetails(userParam){
    var deferred=Q.defer();

    console.log(userParam);

    /**
    request(config.commonServiceURL + '/user/getByName/' + userParam, function (error, response, body) {
    if(error){
        console.log(error);
    }
    if (!error && response.statusCode == 200) {
    
        deferred.resolve(body);
    }

    })*/
    var deferred = Q.defer();
    const getUserQuery = client.query("select * from budget_schema.users where user_name = "+"'"+userParam+"'");
    getUserQuery.on("row", function (row, user) {
        user.addRow(row);
    
    });

    getUserQuery.on("end", function (user) {
    console.log(JSON.stringify(user.rows))
    
    client.end();
    deferred.resolve(JSON.stringify(user.rows));
    });
    return deferred.promise;

}

function _resetPassword(user_name,password,confirmPassword) {
    var deferred = Q.defer();  

    console.log(user_name + " " + password + " "+ confirmPassword)
 
    
   
    if(password == confirmPassword){
        
        const resetPasswordQuery = client.query("update  budget_schema.authenticates set password ="+ "'"+password+"' where username = "+"'"+user_name+"'");
        console.log(resetPasswordQuery);
       

        resetPasswordQuery.on('end', () => { client.end();
       });
    }
    else{
        console.log('Password and confirm password is not matching')
    }
    
    
    return deferred.promise;
   
} 
