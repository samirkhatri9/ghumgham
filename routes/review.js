const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js"); 
const Review = require("../models/review.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/reviews.js")

//Review adding route
router.post("/",isLoggedIn, validateReview,wrapAsync(reviewController.createReview));

//Review delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;