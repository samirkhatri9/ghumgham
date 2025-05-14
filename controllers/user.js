const User = require("../models/user.js");

module.exports.signupForm = (req,res)=>{
    res.render("users/signup.ejs")
};

module.exports.signup = async(req,res)=>{
    //if we dont use try catch here then only the error msg will flash .
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err)=> {
            if (err) { return next(err); }
                req.flash("success", "Welcome to wanderlust!");
                res.redirect("/listings");
            }); 
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }

    
}

module.exports.loginForm =  (req,res)=>{
    res.render("users/login.ejs")
}

module.exports.login = async(req,res)=>{
    req.flash("success", "Welcome to wanderlust! you are loggedin");

    ///ress.locals.redirect wont work when we login directly form listing page because isLoggedIn function is never triggered so we have nothing there to solve this problem we crearte a variable which holds the value of res.locals.redirect if it exists and if it doesnot we set default as "/listings".
    let redirectURL = res.locals.redirectURL || "/listings";
    res.redirect(redirectURL);
};

module.exports.logout =  (req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success", "Logged out.");
        res.redirect("/listings");
    })
};