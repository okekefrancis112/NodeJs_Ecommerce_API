const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { response } = require('express');
const { findById } = require('../models/userModel');

const createUser = asyncHandler(async(req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email:email });

    if (!findUser) {

        // Create a new user
        const newUser = await User.create(req.body);
        res.json(newUser);

    } else {
        // User Already Exists.
        throw new Error('User Already Exists.');
    }
});


const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Check if user exists or not

    const findUser = await User.findOne({ email });
    const user = (await findUser.isPasswordMatched(password))
    if (findUser && user) {
        console.log(findUser);
        res.json(findUser);
    } else {
        throw new Error ("Invalid Credentials.");
    }

});

module.exports = { createUser, loginUserCtrl };