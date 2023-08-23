/** 
 * Node has module level scoping -- which mean defining a global variable in 
 * the current module will not give access to its global variables
 * to other module who import the current module. 
 */



// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var secrets = require('./config/secrets');
var router = express.Router();

// Create our Express application
var app = express();

// Use environment defined port or 4000
var port = process.env.PORT || 4000;

mongoose.connect(secrets.mongo_connection, { useNewUrlParser: true });


// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Use routes as a module (see index.js)
require('./routes')(app, router);

// tell express to serve static content of public dir 
// app.use(express.static('public'));

// use res.render to load up an ejs view file
// app.set("view engine", "ejs");

//default app route
// app.get("/", function (req, res) {
//     res.render("../public");
// });

// require('./api')();
// server.use('/api', apiRouter);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
