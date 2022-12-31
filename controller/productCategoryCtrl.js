const Category = require('../models/productCategoryModel');
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require('../utils/validateMongodbid');


// Create Product Category
const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error);
    }
});


// Update category
const updateCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body,
            {
                new: true,
            });
        res.json(updatedCategory);
    } catch (error) {
        throw new Error(error);
    }
});


// Delete category
const deleteCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const deletedCategory = await Category.findByIdAndDelete(id)
        res.json(deletedCategory);
    } catch (error) {
        throw new Error(error);
    }
});


// Get Product Category
const getCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const get_a_Category = await Category.findById(id);
        res.json(get_a_Category);
    } catch (error) {
        throw new Error(error);
    }
});


// Get All Product Category
const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const get_all_Category = await Category.find();
        res.json(get_all_Category);
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory
};