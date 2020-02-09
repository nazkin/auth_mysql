var path = require('path');

var isAuthenticated = require("../../config/middleware/isAuthenticated");

module.exports = (app)=> {
    app.get("/", (req,res)=> {
        if(req.user){
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../../public/signup.html"));
    });

    app.get("/login", (req, res)=> {
        // If the user already has an account send them to the members page
        if (req.user) {
          res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../../public/login.html"));
      });
      
    app.get("/members", isAuthenticated, (req, res)=>{
        res.sendFile(path.join(__dirname, "../../public/members.html"));
    });

}