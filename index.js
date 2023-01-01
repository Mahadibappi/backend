const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 6000;

// connect to database
mongoose.connect(process.env.MONGO_URI)

    .then(() => {
        app.get("/", (req, res) => {
            res.send("inventory server is running");
        })

        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`)
        })
    })
    .catch(err => console.log(err)) 