const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");



// Create a new Product
const createProduct = asyncHandler(async (req, res) => {
    try{
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
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
    try {
        const getallProducts = await Product.find();
        res.json(getallProducts);
    } catch (error) {
        throw new Error(error);
    }
});






module.exports = { createProduct, getProduct, getAllProducts };