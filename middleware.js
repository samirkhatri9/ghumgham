const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");


module.exports.isLoggedIn = (req,res,next)=>{
      if(!req.isAuthenticated()){
        req.session.redirectURL = req.originalUrl;
        req.flash("error", "You must be loggedin.");
       return res.redirect("/login")
    }
    next();
}

//passport automatically clears the session information once the user is logged in meaning our res.sessions.redirectUrl will not be accessable to solve this problem we have to save that info in a locals variable

module.exports.saveRedirectURL= (req,res,next)=>{
    if (req.session.redirectURL){
        res.locals.redirectURL = req.session.redirectURL;
    } next()
}

//To check if the owner is sending the request for authorization
module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of the listing.");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next)=>{
    let {error} = listingSchema.validate(req.body);

    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",")
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}


module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

module.exports.isReviewAuthor = async(req,res,next)=>{
    let {id ,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "It's not your review.");
        return res.redirect(`/listings/${id}`);
    }
    next()
}