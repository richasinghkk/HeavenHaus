// const Joi = require('joi');

// module.exports.listingSchema = Joi.object({
//    listing:Joi.object({
//     title:Joi.string().required(),
//     description:Joi.string().required(),
//     location:Joi.string().required(),
//     country:Joi.string().required(),
//     price:Joi.number().required().min(0),
//     image:Joi.string().allow("",null)
//    }).required()
// });

// module.exports.reviewSchema=Joi.object({
//    review: Joi.object({
//       rating: Joi.number().required().min(1).max(5),
//       comment: Joi.string().required()
//    }).required()
// });

const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required().messages({
            "string.empty": "Title is required",
            "any.required": "Title is required",
        }),
        description: Joi.string().required().messages({
            "string.empty": "Description is required",
            "any.required": "Description is required",
        }),
        location: Joi.string().required().messages({
            "string.empty": "Location is required",
            "any.required": "Location is required",
        }),
        country: Joi.string().required().messages({
            "string.empty": "Country is required",
            "any.required": "Country is required",
        }),
        price: Joi.number().required().min(0).messages({
            "number.base": "Price must be a number",
            "number.empty": "Price is required",
            "any.required": "Price is required",
            "number.min": "Price must be greater than or equal to 0",
        }),
        image: Joi.string().allow("", null).messages({
            "string.base": "Image URL must be a string",
        }),
    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5).messages({
            "number.base": "Rating must be a number",
            "number.empty": "Rating is required",
            "any.required": "Rating is required",
            "number.min": "Rating must be at least 1",
            "number.max": "Rating must be at most 5",
        }),
        comment: Joi.string().required().messages({
            "string.empty": "Comment is required",
            "any.required": "Comment is required",
        }),
    }).required(),
});