const mongoose = require('mongoose');
const Listing = require("../models/listing.js");
const sampleDB = require("../init/sampledb.js");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/WanderLust');
}

main().then(() => {
    console.log("Connection Succeeded");
})
    .catch(err => console.log(err));

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(sampleDB.data).then((res)=>{
        console.log("Data is Initialized");
        console.log(res);
    });
}
initDB();