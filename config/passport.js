var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require('../models');
//Specifying passport login strategy refer to passport website for details
passport.use(new LocalStrategy(
    {
        usernameField: "email"
    },
    (email, password, done)=> {
        db.User.findOne({
            where: {
                email: email
            }
        }).then(dbUser=> {
            if(!dbUser){
                return done(null, false, {
                    message: "incorrect email was entered"
                });
            } else if(!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "incorrect password was entered"
                });
            } else {
                return done(null, dbUser);
            }
        });
    }
));

//To keep authentication of the user connected across all HTTP request and user activity
//We must serialize and deserialize the user

passport.serializeUser((user, cb)=>{
    cb(null, user);
});

passport.deserializeUser((object, cb)=> {
    cb(null, object);
});

module.exports = passport;