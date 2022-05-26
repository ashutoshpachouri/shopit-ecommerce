const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errors");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
// const dotenv = require("dotenv");
const path = require("path");

if(process.env.NODE_ENV !== "PRODUCTION") require('dotenv').config({ path: "backend/config/config.env" });


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());



const products = require("./routes/products");
const auth = require("./routes/auth");
const payment = require("./routes/payment");
const order = require("./routes/order");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", payment);
app.use("/api/v1", order);

if(process.env.NODE_ENV === "PRODUCTION"){
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
    });
}

//MiddleWare to handle errors
app.use(errorMiddleware);

module.exports = app;
