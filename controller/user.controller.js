var config = require('../config.json');
var express = require('express');
var router = express.Router();
var userService = require('../service/user.service');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// routes
router.post('/authenticate', authenticate);

router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);

router.get('/getByName' , getUserDetails);
router.put('/resetPassword', _resetPassword);

module.exports = router;

function authenticate(req, res) {

    var username = req.body.email
    var password = req.body.password
    //console.log("Ye kya chal raha hai: "+ username + " " + password)
    userService.authenticate(username, password)
        .then(function (userToken) {
            if (userToken) {
                // authentication successful
                res.send(userToken);
            } else {
                // authentication failed
                res.status(400).send('Username or password is incorrect'); 
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function register(req, res) {
    console.log(req.body);

    
    var user_name = req.body.email;
    var first_name = req.body.firstName;
    var last_name = req.body.lastName;
    var email_id = req.body.email;
    //var user_type = req.body.role;
    var  project_name = req.body.projectName;
    var role = req.body.role;
   // var password = Common.encrypt(req.body.password);
    var password = bcrypt.hashSync(req.body.password, 8);

    console.log(user_name+"  "+first_name+"  "+last_name+" "+email_id+" "+project_name+" "+password+" "+role );

    userService.create(user_name,first_name,last_name,email_id,project_name,password,role)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getUserDetails(req,res){

    var user_name = req.query.username
    console.log(user_name)
    userService.getDetails(user_name).then(function(userdetails){
 
    console.log(userdetails);
    res.json(userdetails);

    })
    .catch(function(err){
    res.status(400).send(err);
    });

}

function getAll(req, res) {
    
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
    jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    //res.status(200).send(decoded);
     else{   
    userService.getAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
    }
         });
}

function getCurrent(req, res) {

    var user_id = req.query.userid
    console.log('user id ' + user_id)
   
    userService.getById(user_id)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
        
}

function _resetPassword(req, res){
    //JSON.parse(localStorage.getItem("currentUser"))
    var user_name = req.query.username
    var password = req.query.password
    var confirmPassword = req.query.confirmpassword

    console.log(user_name + " " +password);    
    userService.resetPassword(user_name,password,confirmPassword)
    .then(function () {
        console.log("response came");
        res.sendStatus(200);
    })
    .catch(function (err) {
        console.log("error aa gyi");
       res.status(400).send(err);
    }); 
    
}
