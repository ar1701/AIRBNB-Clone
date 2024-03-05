const express = require("express");
const router = express.Router({mergeParams: true});
const Review = require("../models/review.js");
let wrapAsync = require("../utils/wrapAsync.js");
let ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");


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

router.post(
    "/",
    wrapAsync(async (req, res) => {
      let listing = await Listing.findById(req.params.id);
      let newReview = await new Review(req.body.review);
  
      listing.reviews.push(newReview);
  
      await listing.save();
      await newReview.save();
      res.redirect(`/listings/${listing._id}`);
    })
  );

router.delete("/:reviewId", async (req, res) => {
    let { id, reviewId } = req.params;
  
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
  });
  
  

  module.exports = router;