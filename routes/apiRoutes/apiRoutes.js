const db = require("../models");
const passport = require("../config/passport");

modules.exports = (app)=>{
    app.post("/api/login", passport.authenticate("local"), (req, res)=>{

        res.json("/members");
    });

    app.post("/api/signup", (req,res)=> {
        console.log(req.body);
    })

}