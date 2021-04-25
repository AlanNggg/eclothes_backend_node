const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const multer = require("multer");

const ErrorResponse = require("./lib/ErrorResponse");
const ErrorHandler = require("./controllers/errorController");
const regionRoutes = require("./routes/regionRoutes");
const districtRoutes = require("./routes/districtRoutes");
const userRoutes = require("./routes/userRoutes");
const merchantRoutes = require("./routes/merchantRoutes");
const productRoutes = require("./routes/productRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const followingRoutes = require("./routes/followingRoutes");
const commentRoutes = require("./routes/commentRoutes");
const productCategoryRoutes = require("./routes/productCategoryRoutes");

const upload = multer();

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(upload.array());

app.use("/api/v1/regions", regionRoutes);
app.use("/api/v1/districts", districtRoutes);
// change to productCategories if there are categories other than product categories in the future
app.use("/api/v1/categories", productCategoryRoutes);
app.use("/api/v1/merchants", merchantRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/followings", followingRoutes);
app.use("/api/v1/favorites", favoriteRoutes);

app.all("*", (req, res, next) => {
    next(new ErrorResponse(`${req.originalUrl} NOT FOUND`, 404));
});

app.use(ErrorHandler);

module.exports = app;
