var isAuthenticated = require("../../config/middleware/isAuthenticated");

module.exports = (app)=> {
    app.get("/", (req,res)=> {
        if(req.user){
            res.redirect("/members");
        }
        res.render('signup');
        
    });

    app.get("/login", (req, res)=> {
        // If the user already has an account send them to the members page
        if (req.user) {
          res.redirect("/members");
        }
        res.render("login");
      });
      
    app.get("/members", isAuthenticated, (req, res)=>{
        res.render("members");
    });

}