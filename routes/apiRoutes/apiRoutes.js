const db = require("../../models");
const passport = require("../../config/passport");

module.exports = (app)=>{
    //When a user logs in given their credentials exist in the database
    //Run an authentication middleware provided by passport that decodes our hashed password
    app.post("/api/login", passport.authenticate("local"), (req, res)=>{

        res.json("/members");
    });

    app.post("/api/signup", (req,res)=> {
        console.log(req.body);
        db.User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then(()=>{
                res.redirect(307,"/api/login")
            }).catch((err)=> {
                console.log(err);
            });
    });

    app.get("/logout", (req,res)=> {
        req.logout();
        res.redirect("/");
    });

    app.get('/api/user_data', (req,res)=> {
        if(!req.user){
            res.json({});
        }else {
            //return users id and username
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });

}