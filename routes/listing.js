const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
let wrapAsync = require("../utils/wrapAsync.js");
let ExpressError = require("../utils/ExpressError.js");
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

//Index Route
router.get("/", async (req, res) => {
  const listings = await Listing.find({});
  res.render("./listings/index.ejs", { listings });
});

//New Route
router.get("/new", (req, res) => {
  res.render("./listings/new.ejs");
});

//Show Route
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  const data = await Listing.findById(id).populate("reviews");
  res.render("./listings/show.ejs", { data });
});

//Create route
router.post(
  "/new",
  wrapAsync(async (req, res, next) => {
    let newList = new Listing(req.body.list);
    await newList.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  })
);

//Update Route-GET
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id);
    res.render("./listings/edit.ejs", { data });
  })
);

//Update Route-PUT
router.put("/:id/edit", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.list });
  res.redirect("/listings");
});

//Delete Route
router.delete("/:id/delete", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

module.exports = router;
