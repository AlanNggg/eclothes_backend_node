const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);
