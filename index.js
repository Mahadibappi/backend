require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/userRouter");
const productRoute = require("./routes/productRouter");
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorHandler");
const cookieParser = require("cookie-parser");
const path = require("path");
const fileUpload = require("express-fileupload");
const router = require("./routes/productRouter");

const PORT = process.env.PORT || 6000;

//middlewares

// app.options("http://localhost:3000", cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    // optionSuccessStatus: 200,
  })
);

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    console.log("working");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // // another common pattern
    // // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    // res.setHeader(
    //   "Access-Control-Allow-Methods",
    //   "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    // );
    // res.setHeader(
    //   "Access-Control-Allow-Headers",
    //   "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    // );

    // return res.status(200).end();
  } else {
    next();
  }
});
app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// route middle ware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);

//route setup
app.get("/", (req, res) => {
  res.send("home page");
});

//error middle ware
app.use(errorHandler);

// connect to database
mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {
    app.get("/", (req, res) => {
      res.send("inventory server is running");
    });

    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
