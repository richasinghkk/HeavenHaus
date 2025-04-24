// const express=require("express");
// const router=express.Router(); 
// const wrapAsync=require("../utils/wrapAsync");

// const Listing=require("./models/listing.js");
// const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

// // const validateListing=(req,res,next)=>{
// //     let {error}=listingSchema.validate(req.body);
// //     if(error){
// //         let errMsg=error.details.map((el)=>el.message).join(",");
// //         throw new ExpressError(400,errMsg);
// //     }else{
// //         next();
// //     }
// // };

// //INDEX ROUTE
// router.get(
//     "/",
//     wrapAsync(async(req,res)=>{
//   const allListings= await Listing.find({});
//         res.render("listings/index.ejs",{allListings});
//     }));

//     //NEW ROUTE
//     router.get("/new",isLoggedIn,(req,res)=>{
//     res.render("listings/new.ejs");
//  });

// //SHOW ROUTE
// router.get(
//     "/:id",
     
//     wrapAsync(async(req,res)=>{
//     let {id}=req.params;
//     const listing=await Listing.findById(id).populate("reviews")
//     .populate("owner");
//     if(!listing){
//         req.flash("error","Listing you requested for does not exist");
//         res.redirect("/listings");
//     }
//     console.log(listing);
//     res.render("listings/show.ejs",{listing});
// }));

// //CREATE ROUTE
// router.post(
//     "/", 
//     isLoggedIn,
//     validateListing,
//     wrapAsync(async(req,res,next)=>{
//         const newListing=new Listing(req.body.listing);
//         newListing.owner=req.user._id;
//         await  newListing.save(); 
//         req.flash("success","New Listing Created!");
//         res.redirect("/listings" );
//     })
// );

//  //EDIT ROUTE
//  router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
//      let {id}=req.params;
//      const listing=await Listing.findById(id);
//      if(!listing){
//         req.flash("error","Listing you requested for does not exist");
//         res.redirect("/listings");
//     }
//      res.render("listings/edit.ejs",{listing});
//     }));

// //UPDATE ROUTE
// router.put(
//     "/:id", 
//     isLoggedIn,
//     isOwner, 
//     validateListing,
//     wrapAsync(async (req, res) => {
//     let { id } = req.params;
    
//     // if (!listing) {
//     //     throw new ExpressError(404, "Listing Not Found");
//     // }

//     // // Preserve existing image if the input is empty
//     // if (!req.body.listing.image || req.body.listing.image.trim() === "") {
//     //     req.body.listing.image = listing.image;
//     // }

//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     req.flash("success","Listing Updated!");
//     res.redirect(`/listings/${id}`);
// }));


// //DELETE ROUTE
// router.delete(
//     "/:id",
//     isLoggedIn,
//     isOwner,
//     wrapAsync(async(req,res)=>{
//     let {id}=req.params;
//     let deletedListing=await Listing.findByIdAndDelete(id);
//     console.log(deletedListing); 
//     req.flash("success","listing deleted!");
//     res.redirect("/listings");
// }));

// module.exports=router;



// const express = require("express");
// const router = express.Router();
// const wrapAsync = require("../utils/wrapAsync");
// const Listing = require("../models/listing.js"); // Fixed path
// const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
// const ExpressError = require("../utils/ExpressError.js");

// // INDEX ROUTE
// router.get(
//     "/",
//     wrapAsync(async (req, res) => {
//         const allListings = await Listing.find({});
//         res.render("listings/index.ejs", { allListings });
//     })
// );

// // NEW ROUTE
// router.get("/new", isLoggedIn, (req, res) => {
//     res.render("listings/new.ejs");
// });

// // SHOW ROUTE
// router.get(
//     "/:id",
//     wrapAsync(async (req, res) => {
//         const { id } = req.params;
//         const listing = await Listing.findById(id)
//         .populate({
//             path:"reviews",
//             populate:{
//                 path:"author",
//             },

//         })
//         .populate("owner");

//         if (!listing) {
//             req.flash("error", "Listing you requested for does not exist");
//             return res.redirect("/listings");
//         }

//         res.render("listings/show.ejs", { listing });
//     })
// );

// // CREATE ROUTE
// router.post(
//     "/",
//     isLoggedIn,
//     validateListing,
//     wrapAsync(async (req, res, next) => {
//         if (!req.body.listing) throw new ExpressError(400, "Invalid Listing Data");

//         const newListing = new Listing(req.body.listing);
//         newListing.owner = req.user._id;
//         await newListing.save();

//         req.flash("success", "New Listing Created!");
//         res.redirect("/listings");
//     })
// );

// // EDIT ROUTE
// router.get(
//     "/:id/edit",
//     isLoggedIn,
//     isOwner,
//     wrapAsync(async (req, res) => {
//         const { id } = req.params;
//         const listing = await Listing.findById(id);

//         if (!listing) {
//             req.flash("error", "Listing you requested for does not exist");
//             return res.redirect("/listings");
//         }

//         res.render("listings/edit.ejs", { listing });
//     })
// );

// // UPDATE ROUTE
// router.put(
//     "/:id",
//     isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapAsync(async (req, res) => {
//         const { id } = req.params;

//         if (!req.body.listing) throw new ExpressError(400, "Invalid Listing Data");

//         await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//         req.flash("success", "Listing Updated!");
//         res.redirect(`/listings/${id}`);
//     })
// );

// // DELETE ROUTE
// router.delete(
//     "/:id",
//     isLoggedIn,
//     isOwner,
//     wrapAsync(async (req, res) => {
//         const { id } = req.params;
//         await Listing.findByIdAndDelete(id);

//         req.flash("success", "Listing deleted!");
//         res.redirect("/listings");
//     })
// );

// module.exports = router;

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController=require("../controllers/listings.js");
const multer=require('multer');
const{storage}=require("../cloudConfig.js");

const upload=multer({storage});

router
.route("/")
    .get(wrapAsync(listingController. index))
    .post( 
        isLoggedIn,
        
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing)
    );



// NEW ROUTE
router.get("/new", isLoggedIn,listingController.renderNewForm);


router.route("/:id")
.get(  wrapAsync(listingController.showListing))
.put(
     isLoggedIn,
     isOwner,
     upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing))
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing)
    );




// EDIT ROUTE
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));





module.exports = router;