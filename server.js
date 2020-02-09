var express = require("express");
var session = require("express-session");
// Setting up port
var passport = require('./config/passport')
var PORT = process.env.PORT || 8080;

var db = require("./models");

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Using passport as configured 
app.use(session({secret: "amazingandalways awesome", resave:true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

//Requiring routes as defined in the routes folder
require("./routes/apiRoutes/apiRoutes")(app);
require("./routes/htmlRoutes/htmlRoutes")(app);



db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
  });