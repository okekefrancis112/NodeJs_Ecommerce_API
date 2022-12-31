const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');
const validateMongoDbId = require('../utils/validateMongodbid');
const { generateRefreshToken } = require('../config/refreshtoken');
const jwt = require('jsonwebtoken');
// const sendEmail = require('./emailCtrl');
// const crypto = require('crypto');

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
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(
            findUser.id,
            {
            refreshToken: refreshToken,
        },
        { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
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


// Update a user
const updatedUser =  asyncHandler (async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
             {
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
                mobile: req?.body?.mobile,
        },
        {
            new: true,
        }
        );
        res.json(updatedUser);
    } catch (error) {
        throw new Error (error);
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
    validateMongoDbId(id);
    try {
        const getUser = await User.findById( id);
        res.json({
            getUser,
        });
    } catch (error) {
        throw new Error (error);
    }
});


// Handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    // console.log(cookie);
    if (!cookie.refreshToken) throw new Error("No refresh token in Cookies.");
    const refreshToken = cookie.refreshToken;
    // console.log(refreshToken);
    const user = await User.findOne({ refreshToken: refreshToken });
    if (!user) throw new Error("No refresh token in db or not matched.");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("There is something wrong with refresh token.");
        }
        const accessToken = generateToken(user?.id);
        res.json({accessToken});
    });
});


// Logout User
const logoutUser = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie.refreshToken) throw new Error("No refresh token in Cookies.");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken: refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204); // Forbidden
    }
    await User.findOneAndUpdate(refreshToken, {
        refreshToken: "",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    res.sendStatus(204); // Forbidden
});


// Delete a user
const deleteUser = asyncHandler (async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.json({
            deleteUser,
        });
    } catch (error) {
        throw new Error (error);
    }
});


const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const unblock = User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            {
                new: true,
            }
        );
        res.json({
            message: "User Blocked",
        });
    } catch (error) {
        throw new Error(error);
    }
});
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const unblock = User.findByIdAndUpdate(
            id,
            {
                isBlocked: false,
            },
            {
                new: true,
            }
        );
        res.json({
            message: "User UnBlocked",
        });
    } catch (error) {
        throw new Error(error);
    }
});


// Update a user password
const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const {password} = req.body;
    validateMongoDbId(_id);
    const user = await User.findById(_id);
    if (password){
        user.password = password;
        const updatedPassword = await user.save();
        res.json(updatedPassword);
    } else {
        res.json(user);
    }
});

module.exports = {
    createUser,
    loginUserCtrl,
    getallUsers,
    getUser,
    deleteUser,
    updatedUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logoutUser,
    updatePassword
};