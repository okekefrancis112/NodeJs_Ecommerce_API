const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");



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






module.exports = {
    createProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
};