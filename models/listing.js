const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { ref, required, string } = require('joi');


const listingSchema = new Schema ({
    title: {
        type: String,
        // required: true,
    },
    description :  {
        type: String,
        // required: true,
    },
    image: {
        filename: {type:String},
       url:{ type: String,
    }},

    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{
        type:{
            type: String,
            enum: ["Point"],
            required: true,
        },
            
        coordinates:{
            type:[Number],
            required: true
        },
    },
        
});


//This middleware is here to delete all the reviews in a listing from reviews collection in the listings database.
listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}})
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;