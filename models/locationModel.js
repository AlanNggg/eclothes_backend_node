const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["Point", "LineString", "Polygon"],
        default: "Point",
    },
    coordinates: [Number],
    address: String,
    district: {
        type: mongoose.Types.ObjectId,
        ref: "District",
        required: true,
    },
    select: false,
});

module.exports = locationSchema;
