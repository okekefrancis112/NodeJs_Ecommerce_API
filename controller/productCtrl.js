const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require('../utils/validateMongodbid');
const User = require('../models/userModel');
const cloudinaryUploadImg = require("../utils/cloudinary")



// Create a new Product
const createProduct = asyncHandler(async (req, res) => {
    try{
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error);
    }
});


// Update a product
const updateProduct = asyncHandler(async (req, res) => {
    const _id = String(req.params.id);
    validateMongoDbId(_id);
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const update = await Product.findByIdAndUpdate(
            _id,
             {
                title: req?.body?.title,
                slug: req?.body?.slug,
                category: req?.body?.category,
                brand: req?.body?.brand,
                description: req?.body?.description,
                price: req?.body?.price,
                quantity: req?.body?.quantity,
                color: req?.body?.color,
                wishlist: req?.body?.wishlist,
        },
        {
            new: true,
        });
        res.json(update);
    } catch (error) {
        throw new Error(error);
    }
});


// Delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const deleteProduct = await Product.findOneAndDelete(id);
        res.json(deleteProduct);
    }catch (error) {
        throw new Error(error);
    }
});


// Get Product
const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});


// Get all products
const getAllProducts = asyncHandler(async (req, res) => {
    // console.log(req.query)
    try {
        // Filtering products
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        let query = Product.find(JSON.parse(queryStr));

        // Sorting products

        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").split(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        //  Limiting product fields

        if (req.query.fields) {
            const fields = req.query.fields.split(",").split(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v");
        }

        // Pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) throw new Error ("This page does not exists.")
        }
        console.log(page, skip, limit);

        const product = await query;
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});


// Add to wishlist
const addToWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;
    validateMongoDbId(_id);
    // console.log("added>>>>>>>>>>>>>>>>.", _id );
    try{
        const user = await User.findById(_id);
        const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);
        // console.log("added>>>>>>>>>>>>>>>>.", alreadyAdded);
        if (alreadyAdded) {
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $pull: { wishlist: prodId },
                },
                {
                    new: true,
                }
            );
            console.log(user);
            res.json(user);
        } else {
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $push: { wishlist: prodId },
                },
                {
                    new: true,
                }
            );
            console.log(user);
            res.json(user);
        }
    } catch (error) {
        throw new Error(error);
    }
});


// Create and Update Rating
const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    // console.log("_id>>>>>>>>>>>>>>>>>>>>.: " + _id);
    const {star, prodId, comment } = req.body;
    try {
        const product = await Product.findById(prodId);
        // console.log("product>>>>>>>>>>>>>>>>>>>>.: " +  product.ratings);
        let alreadyRated = product.ratings.find(
            (userId) => userId.postedBy.toString() === _id.toString()
        );
        // console.log("alreadyRated>>>>>>>>>>>>>>>>>>>>.: " + alreadyRated);
        if (alreadyRated) {
            const updateRating = await Product.updateOne(
                {
                    ratings: { $elemMatch: alreadyRated },
                },
                {
                    $set: { "ratings.$.star": star, "ratings.$.comment": comment },
                },
                {
                    new: true,
                }
            );
            // console.log(updateRating);
            // res.json(updateRating);
        } else {
            const rateProduct = await Product.findByIdAndUpdate(
                prodId,
                {
                    $push: {
                        ratings: {
                            star: star,
                            comment: comment,
                            postedBy: _id,
                        },
                    },
                },
                {
                    new: true,
                }
            );
            // console.log(rateProduct);
            // res.json(rateProduct);
        }
        const getAllRatings = await Product.findById(prodId);
        let totalRating = getAllRatings.ratings.length;
        let ratingsum = getAllRatings.ratings
            .map((item) => item.star )
            .reduce((prev, curr) => prev + curr, 0);
        let actualRating = Math.round(ratingsum / totalRating);
        let finalproduct = await Product.findByIdAndUpdate(
            prodId,
            {
                totalrating: actualRating,
            },
            { new: true }
        );
        console.log(finalproduct);
        res.json(finalproduct);
    } catch (error) {
        throw new Error(error);
    }
});


// Upload Images
const uploadImages = asyncHandler(async (req, res) => {
    // console.log(req.files);
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const uploader = ( path ) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            console.log(path);
            const newpath = await uploader(path);
            console.log(newpath);
            urls.push(newpath);
        }
        const findProduct = await Product.findByIdAndUpdate(
            id,
            {
                images: urls.map((file) => {
                    return file;
                }),
            },
            {
                new: true,
            }
        );
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});



module.exports = {
    createProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    addToWishlist,
    rating,
    uploadImages,
};