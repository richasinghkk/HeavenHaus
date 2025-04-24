
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const Review = require("./review.js");

// const listingSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: String,
//     image: {
//         filename: String,
//         url: {
//             type: String,
//             default: "https://source.unsplash.com/featured/?travel",
//             set: (v) =>
//                 v === ""
//                     ? "https://source.unsplash.com/featured/?travel"
//                     : v,
//         },
//     },
//     price: {
//         type: Number,
//         required: true,
//     },
//     location: {
//         type: String,
//         required: true,
//     },
//     country: String,
//     reviews: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Review",
//         },
//     ],
//     owner:{
//         type:Schema.Types.ObjectId,
//         ref:"User",
//     },
// });

// // Middleware to delete associated reviews when a listing is deleted
// listingSchema.post("findOneAndDelete", async (listing) => {
//     if (listing) {
//         await Review.deleteMany({ _id: { $in: listing.reviews } });
//     }
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const DEFAULT_IMAGE_URL = "https://via.placeholder.com/500x300?text=Property+Image"; // Using a static placeholder

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url:String,
        filename:String,
        },
        // Removed 'filename' as it wasn't clearly used in the logic
    
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

// Middleware to delete associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing && listing.reviews.length > 0) { // Added a check for reviews before attempting deletion
        await Review.deleteMany({ _id: { $in: listing.reviews } });
        console.log(`Deleted ${listing.reviews.length} reviews associated with listing: ${listing.title}`);
    } else if (listing) {
        console.log(`No reviews to delete for listing: ${listing.title}`);
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
