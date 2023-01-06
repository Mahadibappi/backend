
const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { use } = require('../routes/userRouter');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

// register new user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    //validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("please fill all required fields")
    }
    if (password.length < 6) {
        res.status(400)
        throw new Error("password must be mores than 6 characters")
    }
    // if email exist
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('Email already exist')
    }



    // create new user

    const user = await User.create({
        name,
        email,
        password
    })
    // generate token
    const token = generateToken(user._id)

    //https only cookie 
    res.cookie('token', token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: 'none',
        secure: true

    })

    if (user) {
        const { _id, name, email, phone, photo, bio } = user
        res.status(201).json({
            _id,
            name,
            email,
            phone,
            photo,
            bio,
            token
        })
    }
    else {
        res.status(400)
        throw new Error('invalid user data')
    }



});

// Login the created user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    //validation
    if (!email || !password) {
        res.status(400)
        throw new Error('Please add valid email and password')
    }
    // check if email exist
    const user = await User.findOne({ email })

    if (!user) {
        res.status(400)
        throw new Error("User not found,Pleas log out")
    }
    //check if password correct 
    const correctPassword = await bcrypt.compare(password, user.password)
    // generate token
    const token = generateToken(user._id)

    //https only cookie 
    if (correctPassword) {
        res.cookie('token', token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: 'none',
            secure: true

        })
    }


    if (user && correctPassword) {
        const { _id, name, email, phone, photo, bio } = user
        res.status(200).json({
            _id,
            name,
            email,
            phone,
            photo,
            bio,
            token

        })
    } else {
        res.status(400);
        throw new Error("Invalid email or password");
    }
})

// Log out the user 
const logout = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        path: '/',
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true,
    });
    return res.status(200).json({ message: "User Logged Out Successfully" })
});

// get user data to show profile 
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        const { _id, name, email, phone, photo, bio } = user
        res.status(201).json({
            _id,
            name,
            email,
            phone,
            photo,
            bio,

        })
    }
    else {
        res.status(401)
        throw new Error('user not found')
    }
})

// user login status check if logged in or not
const loggedIn = asyncHandler(async (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.json(false)
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
        return res.json(true)
    } return res.json(false)
})

// update user profile
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        const { name, email, photo, phone, bio } = user
        user.email = email;
        user.name = req.body.name || name;
        user.phone = req.body.name || phone;
        user.photo = req.body.photo || photo;
        user.bio = req.body.bio || bio;


        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            photo: updatedUser.photo,
            phone: updatedUser.phone,
            bio: updatedUser.bio
        })
    } else {
        res.status(401)
        throw new Error("User Not Found")
    }

});

// change password
const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(400)
        throw new Error("User Not Found")
    }
    const { oldPassword, password } = req.body

    //validation
    if (!oldPassword || !password) {
        res.status(400)
        throw new Error("Please add old and new Password")
    }

    //check if the old password is correct
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password)
    if (user && passwordIsCorrect) {
        user.password = password
        await user.save();
        res.status(200).send("password changed successfully");
    } else {
        res.status(400);
        throw new Error("old password is incorrect");
    }

})


module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    loggedIn,
    updateUser,
    changePassword
}