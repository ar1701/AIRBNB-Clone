const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
let wrapAsync = require("../utils/wrapAsync.js");
let ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controller/listing.js");
// const {listingSchema} = require("./schema.js");

// const validateListing = (req,res,next)=>{
//     let {error} = listingSchema.validate(req.body);
//     if(error){
//         let errMsg = error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     }else{
//         next();
//     }
// };

const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({storage});

//Index Route
router.get("/", listingController.index);

router
  .route("/new")
  .get(isLoggedIn, listingController.newListing)
  // .post(wrapAsync(listingController.createListing));
  .post(upload.single('list[image]'), (req,res)=>{
    res.send(req.file);
  })

router.route("/:id").get(listingController.showListing);

router
  .route("/:id/edit")
  .get(isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm))
  .put(isLoggedIn, isOwner, listingController.updateListing);

//Delete Route
router.delete(
  "/:id/delete",
  isLoggedIn,
  isOwner,
  listingController.deleteListing
);

module.exports = router;
