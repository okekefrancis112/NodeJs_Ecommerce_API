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


module.exports = { createCategory, updateCategory, deleteCategory };