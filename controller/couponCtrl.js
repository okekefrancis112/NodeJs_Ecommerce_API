const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
// const slugify = require("slugify");
const validateMongoDbId = require('../utils/validateMongodbid');
// const User = require('../models/userModel');


//  Create Coupon
const createCoupon = asyncHandler(async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    } catch (err) {
        throw new Error(err);
    }
});


//  Get All Coupon
const getAllCoupons = asyncHandler(async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (err) {
        throw new Error(err);
    }
});


//  Update Coupon
const updateCoupons = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(id);
        res.json(updatedCoupon);
    } catch (err) {
        throw new Error(err);
    }
});

module.exports = { createCoupon, getAllCoupons, updateCoupons };