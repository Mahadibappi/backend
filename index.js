const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const userRoute = require('./routes/userRouter')

const PORT = process.env.PORT || 6000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

// route middle ware
app.use("/api/users", userRoute)

//route setup
app.get('/', (req, res) => {
    res.send('home page')
})

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