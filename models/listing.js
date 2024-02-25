const { default: mongoose } = require("mongoose");
let Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        // default: "https://images.unsplash.com/photo-1708356472352-4dcb5312ebcd?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // set: (v)=>v===""?"https://images.unsplash.com/photo-1708356472352-4dcb5312ebcd?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
    },
    price: Number,
    location: String,
    country: String
})

const Listing = new mongoose.model("Listing", listingSchema);
module.exports = Listing;