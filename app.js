const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");    
const Listing = require("../AIRBNB/models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/WanderLust');
  }

main().then(()=>{
    console.log("Connection Succeeded");
})
.catch(err => console.log(err));

let port = 8080;
app.listen(port, ()=>{
    console.log("Listening to the Port "+port);
});

app.get("/", (req,res)=>{
    let obj = {
        str: "Hi, Webpage and USER"
    };
    res.json(obj);
})

app.get("/listings", async (req,res)=>{
    const listings = await Listing.find({});
    res.render("./listings/index.ejs", {listings})
})

app.get("/listings/new", (req,res)=>{
    res.render("./listings/new.ejs");
})

app.get("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    const data = await Listing.findById(id);
    res.render("./listings/show.ejs", {data});
})

app.post("/listings/new", async (req,res)=>{
    let newList = new Listing(req.body.list);
    await newList.save();
    res.redirect("/listings");
})

app.get("/listings/:id/edit", async (req,res)=>{
    let {id} = req.params;
    let data = await Listing.findById(id);
    res.render("./listings/edit.ejs", {data});
})

app.put("/listings/:id/edit", async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.list});
    res.redirect("/listings");
    
})
app.delete("/listings/:id/delete", async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    
})
    
