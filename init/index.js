const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wander";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}



const initDB = async () => {
  await Listing.deleteMany({});
  const ownerId = new mongoose.Types.ObjectId("652d0081ae547c5d37e5a9c2"); 

  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: ownerId,
  }));
  await Listing.insertMany(initdata.data);
  console.log("data was initialized");
};


initDB();
