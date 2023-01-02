const mongoose = require('mongoose');


const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please enter your name"]
        },
        email: {
            type: String,
            required: [true, "please a valid email"],
            unique: true,
            trim: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please enter a valid email"
            ],
        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
            minLength: [6, "password must be 6 characters"],

        },
        photo: {
            type: String,
            required: [true, "please enter a photo"],
            default: "https://i.ibb.co/4pDNDk1/avatar.png",
        },
        phone: {
            type: String,
            default: "+088"
        },
        bio: {
            type: String,
            maxLength: [250, "bio should not be more than 250 characters"],
            default: "bio",
        },
        timestamps: true,
    }
)

const User = mongoose.model("User", userSchema);
module.exports = User;
