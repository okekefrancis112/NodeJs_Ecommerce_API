const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');

// Register a User
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


// Login User
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Check if user exists or not

    const findUser = await User.findOne({ email });
    const user = (await findUser.isPasswordMatched(password))
    if (findUser && user) {
        // console.log(findUser);
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    } else {
        throw new Error ("Invalid Credentials.");
    }

});


// Get all users
const getallUsers = asyncHandler (async (req, res) => {
    try {
        const getUsers =  await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error (error);
    }
});


// Get a user
const getUser = asyncHandler (async (req, res) => {
    const { id } = req.params;
    try {
        const getUser = await User.findById( id);
        res.json({
            getUser,
        });
    } catch (error) {
        throw new Error (error);
    }
});


// Delete a user
const deleteUser = asyncHandler (async (req, res) => {
    const { id } = req.params;
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.json({
            deleteUser,
        });
    } catch (error) {
        throw new Error (error);
    }
});

module.exports = { createUser, loginUserCtrl, getallUsers, getUser, deleteUser  };