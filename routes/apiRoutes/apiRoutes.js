const db = require("../../models");
const passport = require("../../config/passport");


module.exports = function(app) {
 
  app.post("/api/login", passport.authenticate("local",
   {
     successRedirect: "/members",
     failureRedirect: "/"
   }
    ), function(req, res) {
    
    res.json(true);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // When returning the promise I used code 307 which moves the resources of HTTP request to another URI
  // This means that even when i sign the user up he is authenticated to move to another page via /api/login route
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

};