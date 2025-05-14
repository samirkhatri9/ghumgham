const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("conected to database")
}).catch((err)=>{
    console.log(err);
});


async function main() {
    await mongoose.connect(MONGO_URL)
}

//to clear previous data in the database and reinitialize the data

const initDB = async ()=>{
    await Listing.deleteMany({});
    //This is to add owner field to every listing details
    initData.data = initData.data.map((obj)=>({...obj, owner:"68208ced104fb0fe29a0673c"}))
    await Listing.insertMany(initData.data);
    console.log("data was initialized.");
}

initDB();