const Listing=require("../models/listing");
const Review=require("../models/review");


module.exports.createReview=async (req, res) => {
        if (!req.body.review) {
            return next(new ExpressError(400, "Invalid Review Data"));
        }

        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }

        const newReview = new Review(req.body.review);
        newReview.author = req.user._id; // Set the author of the review
        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();

        req.flash("success", "New Review Created!");
        res.redirect(`/listings/${listing._id}`);
    };

    module.exports.destroyReview=async (req, res) => {
            const { id, reviewId } = req.params;
    
            await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
            await Review.findByIdAndDelete(reviewId);
    
            req.flash("success", "Review Deleted!");
            res.redirect(`/listings/${id}`);
        };