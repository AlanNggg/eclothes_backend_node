const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const regionRoutes = require("./routes/regionRoutes");
const districtRoutes = require("./routes/districtRoutes");
const userRoutes = require("./routes/userRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use("/api/v1/regions", regionRoutes);
app.use("/api/v1/districts", districtRoutes);

app.all("*", (req, res, next) => {
    console.log(`${req.originalUrl} NOT FOUND`);
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        status: err.status,
        error,
        err,
        message: err.message,
        stack: err.stack,
    });
});

module.exports = app;
