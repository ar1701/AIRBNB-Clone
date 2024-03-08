const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    const listings = await Listing.find({});
    res.render("./listings/index.ejs", { listings });
  };

  module.exports.newListing = (req, res) => {
    res.render("./listings/new.ejs");
  };

  module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const data = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");
    res.render("./listings/show.ejs", { data });
  };

  module.exports.createListing = async (req, res, next) => {
    let newList = new Listing(req.body.list);

    newList.owner = req.user._id;
    await newList.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  };

  module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id);
    res.render("./listings/edit.ejs", { data });
  };

  module.exports.updateListing = async (req, res, next) => {
    try {
      let { id } = req.params;
      await Listing.findByIdAndUpdate(id, { ...req.body.list });
      res.redirect("/listings");
    } catch (err) {
      next(err); // Pass any errors to the error handling middleware
    }
  };

  module.exports.deleteListing = async (req, res, next) => {
    try {
      let { id } = req.params;
      const demolisting = await Listing.findByIdAndDelete(id);
      res.redirect("/listings");
    } catch (err) {
      next(err); // Pass any errors to the error handling middleware
    }
  };