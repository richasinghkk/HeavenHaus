// // const Listing=require("./models/listing");
// // const ExpressError=require("./utils/ExpressError.js");
// // const { listingSchema,reviewSchema }= require("./schema.js");


// // module.exports.isLoggedIn=(req,res,next)=>{
// //     if(!req.isAuthenticated()){
// //         req.session.redirectUrl=req.originalUrl;
// //         req.flash("error","you must be logged in to create listing");
// //        return res.redirect("/login");
// //     }
// //     next();
// // };

  

// // module.exports.saveRedirectUrl=(req,res,next)=>{
// //     if(req.session.redirectUrl){
// //         res.locals.redirectUrl=req.session.redirectUrl;
// //     }
// //     next();
// // };

// // module.exports.isOwner=async(req,res,next)=>{
// //     let { id } = req.params;
// //     let listing = await Listing.findById(id);
// //     if(!listing.owner.equals(res.locals.currUser._id)){
// //         req.flash("error","You are not the owner of this listing");
// //         return res.redirect(`/listings/${id}`);
// //     }
// //     next();
// // };

// // module.exports.validateListing=(req,res,next)=>{
// //     let {error}=listingSchema.validate(req.body);
// //     if(error){
// //         let errMsg=error.details.map((el)=>el.message).join(",");
// //         throw new ExpressError(400,errMsg);
// //     }else{
// //         next();
// //     }
// // };

// // module.exports.validateReview=(req,res,next)=>{
// //     let {error}=reviewSchema.validate(req.body);
// //     if(error){
// //         let errMsg=error.details.map((el)=>el.message).join(",");
// //         throw new ExpressError(400,errMsg);
// //     }else{
// //         next();
// //     }
// // };

// const Listing = require("./models/listing");
// const Review = require("./models/review");
// const ExpressError = require("./utils/ExpressError.js");
// const { listingSchema, reviewSchema } = require("./schema.js");

// // Middleware to check if user is logged in
// module.exports.isLoggedIn = (req, res, next) => {
//     if (!req.isAuthenticated()) {
//         req.session.redirectUrl = req.originalUrl;
//         req.flash("error", "You must be logged in to create a listing");
//         return res.redirect("/login");
//     }
//     next();
// };

// // Middleware to save redirect URL (if exists) in locals
// module.exports.saveRedirectUrl = (req, res, next) => {
//     if (req.session.redirectUrl) {
//         res.locals.redirectUrl = req.session.redirectUrl;
//     }
//     next();
// };

// // Middleware to check if current user is the owner of the listing
// module.exports.isOwner = async (req, res, next) => {
//     const { id } = req.params;
//     const listing = await Listing.findById(id);

//     if (!listing) {
//         req.flash("error", "Listing not found");
//         return res.redirect("/listings");
//     }

//     if (!res.locals.currUser || !listing.owner.equals(res.locals.currUser._id)) {
//         req.flash("error", "You are not the owner of this listing");
//         return res.redirect(`/listings/${id}`);
//     }

//     next();
// };

// // Middleware to validate listing data using Joi schema
// module.exports.validateListing = (req, res, next) => {
//     const { error } = listingSchema.validate(req.body);
//     if (error) {
//         const errMsg = error.details.map(el => el.message).join(", ");
//         throw new ExpressError(400, errMsg);
//     }
//     next();
// };

// // Middleware to validate review data using Joi schema
// module.exports.validateReview = (req, res, next) => {
//     const { error } = reviewSchema.validate(req.body);
//     if (error) {
//         const errMsg = error.details.map(el => el.message).join(", ");
//         throw new ExpressError(400, errMsg);
//     }
//     next();
// };


// module.exports.isReviewAuthor=async(req,res,next)=>{
//     let { id,reviewId } = req.params;
//     let review= await Review.findById(ReviewId);
//     if(!review.author.equals(res.locals.currUser._id)){
//         req.flash("error","You are not the author of this review");
//         return res.redirect(`/listings/${id}`);
//     }
//     next();
// };

const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

// Middleware to check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to perform this action");
        return res.redirect("/login");
    }
    next();
};

// Middleware to save redirect URL (if exists) in locals
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// Middleware to check if current user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    if (!res.locals.currUser || !listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

// Middleware to validate listing data using Joi schema
module.exports.validateListing = (req, res, next) => {
    const { err } = listingSchema.validate(req.body);
    if (err) {
        const errMsg = err.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    }
    next();
};

// Middleware to validate review data using Joi schema
module.exports.validateReview = (req, res, next) => {
    const { err } = reviewSchema.validate(req.body);
    if (err) {
        const errMsg = err.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    }
    next();
};

// Middleware to check if the current user is the author of the review
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listings/${id}`);
    }

    if (!res.locals.currUser || !review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};