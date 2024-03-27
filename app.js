const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

main().then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Rentalhomes');
};
app.get("/",(req,res)=>{
    res.send("hello");
});

 app.get("/testListing",async (req,res)=>{
     let sampleListing = new Listing({
         title:"my new villa",
         description:"by the beach",
         price: 1200,
         location: "udaipur",
         country: "india",
     });
      await sampleListing.save();
      console.log("sample was saved");
      res.send("success");
 });

app.listen(8080 , ()=>{
    console.log("server is listening")
});
