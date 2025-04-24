// const Listing = require("../models/listing");
// const ExpressError = require("../utils/ExpressError");

// // Show all listings
// module.exports.index = async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", { allListings });
// };

// // Show form to create new listing
// module.exports.renderNewForm = (req, res) => {
//     res.render("listings/new.ejs");
// };

// // Create a new listing
// module.exports.createListing = async (req, res, next) => {
//     try {
//         const newListing = new Listing(req.body.listing);
//         newListing.owner = req.user._id;

//         // Check if file exists before setting image
//         if (req.file) {
//             const { path: url, filename } = req.file;
//             newListing.image = { url, filename };
//         }

//         await newListing.save();
//         req.flash("success", "New Listing Created!");
//         res.redirect("/listings");
//     } catch (err) {
//         next(err);
//     }
// };

// // Show a single listing
// module.exports.showListing = async (req, res) => {
//     const { id } = req.params;

//     const listing = await Listing.findById(id)
//         .populate({
//             path: "reviews",
//             populate: {
//                 path: "author",
//             },
//         })
//         .populate("owner");

//     if (!listing) {
//         req.flash("error", "Listing you requested does not exist.");
//         return res.redirect("/listings");
//     }

//     res.render("listings/show.ejs", { listing });
// };

// // Render edit form
// module.exports.renderEditForm = async (req, res) => {
//     const { id } = req.params;
//     const listing = await Listing.findById(id);

//     if (!listing) {
//         req.flash("error", "Listing you requested does not exist.");
//         return res.redirect("/listings");
//     }

//     res.render("listings/edit.ejs", { listing });
// };

// // Update a listing
// module.exports.updateListing = async (req, res, next) => {
//     const { id } = req.params;
//     let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});

//     if(typeof req.file!=="undefined"){
//     let url=req.file.path;
//     let filename=req.file.filename;
//     listing.image={url,filename};
//     await listing.save();
//     }
//     req.flash("success","Listing Updated");
//     res.redirect(`/listings/${id}`);

// //     try {
// //         const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

// //         if (req.file) {
// //             listing.image = {
// //                 url: req.file.path,
// //                 filename: req.file.filename
// //             };
// //             await listing.save();
// //         }

// //         req.flash("success", "Listing Updated!");
// //         res.redirect(`/listings/${id}`);
// //     } catch (err) {
// //         next(err);
// //     }
// };

// // Delete a listing
// module.exports.destroyListing = async (req, res) => {
//     const { id } = req.params;

//     await Listing.findByIdAndDelete(id);
//     req.flash("success", "Listing deleted!");
//     res.redirect("/listings");
// };



const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");

// Show all listings
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

// Show form to create a new listing
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// Create a new listing
module.exports.createListing = async (req, res, next) => {
    try {
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;

        if (req.file) {
            newListing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        }

        await newListing.save();
        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    } catch (err) {
        next(err);
    }
};

// Show a single listing
module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" },
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested does not exist.");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
};

// Render edit form
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested does not exist.");
        return res.redirect("/listings");
    }

   let originalImageUrl=listing.image.url;
  originalImageUrl= originalImageUrl.replace("/upload","/upload/h_300,w_250");

    res.render("listings/edit.ejs", { listing,originalImageUrl });
};

// Update a listing
module.exports.updateListing = async (req, res, next) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

        if (req.file) {
            listing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
            await listing.save();
        }

        req.flash("success", "Listing Updated!");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        next(err);
    }
};

// Delete a listing
module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
};
