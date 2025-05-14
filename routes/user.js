const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const flash = require("connect-flash");
const { route } = require("./listing.js");
const { saveRedirectURL } = require("../middleware.js");
const userController = require("../controllers/user.js")


router.route("/signup").get(userController.signupForm ).post(wrapAsync( userController.signup));

router.route("/login").get(userController.loginForm).post(saveRedirectURL, passport.authenticate("local",{failureRedirect:"/login", failureFlash:true} ), userController.login)

router.get("/logout",userController.logout)

module.exports = router;