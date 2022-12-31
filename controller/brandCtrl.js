const Brand = require('../models/brandModel');
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require('../utils/validateMongodbid');


// Create Product Brand
const createBrand = asyncHandler(async (req, res) => {
    try {
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);
    } catch (error) {
        throw new Error(error);
    }
});


// Update Brand
const updateBrand = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const updatedBrand = await Brand.findByIdAndUpdate(id, req.body,
            {
                new: true,
            });
        res.json(updatedBrand);
    } catch (error) {
        throw new Error(error);
    }
});


// Delete Brand
const deleteBrand = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const deletedBrand = await Brand.findByIdAndDelete(id)
        res.json(deletedBrand);
    } catch (error) {
        throw new Error(error);
    }
});


// Get Product Brand
const getBrand = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const get_a_Brand = await Brand.findById(id);
        res.json(get_a_Brand);
    } catch (error) {
        throw new Error(error);
    }
});


// Get All Product Brand
const getAllBrand = asyncHandler(async (req, res) => {
    try {
        const get_all_Brand = await Brand.find();
        res.json(get_all_Brand);
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = {
    createBrand,
    updateBrand,
    deleteBrand,
    getBrand,
    getAllBrand
};