
const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


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
        password: hashedPassword
    })
    if (user) {
        const { _id, name, email, phone, photo, bio } = user
        res.status(201).json({
            _id, name, email, phone, photo, bio
        })
    }
    else {
        res.status(400)
        throw new Error('invalid user data')
    }



})

module.exports = {
    registerUser,
}