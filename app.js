const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
let ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/WanderLust");
}

main()
  .then(() => {
    console.log("Connection Succeeded");
  })
  .catch((err) => console.log(err));

const sessionOptions = {
  secret: "mysecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    next();
})

let port = 8080;
app.listen(port, () => {
  console.log("Listening to the Port " + port);
});

app.get("/", (req, res) => {
  let obj = {
    str: "Hi, Webpage and USER",
  };
  res.json(obj);
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);



app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode, message } = err;
  res.status(statusCode).send(message);
});
