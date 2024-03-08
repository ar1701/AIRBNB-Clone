const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const sampleDB = require("../init/sampledb.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/WanderLust");
}

main()
  .then(() => {
    console.log("Connection Succeeded");
  })
  .catch((err) => console.log(err));

const initDB = async () => {
  await Listing.deleteMany({});
  sampleDB.data = sampleDB.data.map((obj) => ({
    ...obj,
    owner: "65e7511b37d5aa00e839e2c4",
  }));
  await Listing.insertMany(sampleDB.data).then((res) => {
    console.log("Data is Initialized");
    console.log(res);
  });
};
initDB();
