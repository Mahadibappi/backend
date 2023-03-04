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
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors(
    {
      origin: ["http://localhost:3000"],
      credentials: true,
    },
    {
      headers: [
        {
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            },
            {
              key: "Access-Control-Allow-Headers",
              value:
                "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          ],
        },
      ],
    }
  )
);

// app.use((req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Max-Age", "1800");
//   res.setHeader("Access-Control-Allow-Headers", "content-type");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "PUT, POST, GET, DELETE, PATCH, OPTIONS"
//   );
// });

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
