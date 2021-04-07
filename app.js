const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
app.use(helmet());

app.use(cors());

app.use(express.json());

app.all("*", (req, res, next) => {
    console.log(`${req.originalUrl} NOT FOUND`);
});

module.exports = app;
