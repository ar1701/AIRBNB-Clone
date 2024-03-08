const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
let wrapAsync = require("../utils/wrapAsync.js");
let ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");
const { isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controller/review.js");

// const {listingSchema} = require("./schema.js");
// const {reviewSchema} = require("./schema.js");

// const validateReview = (req,res,next)=>{
//     let {error} = reviewSchema.validate(req.body);
//     if(error){
//         let errMsg = error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     }else{
//         next();
//     }
// };

router.post("/", isLoggedIn, wrapAsync(reviewController.newReview));

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviewController.deleteReview);

module.exports = router;
