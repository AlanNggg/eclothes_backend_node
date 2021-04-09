const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ["Point", "LineString", "Polygon"],
        default: "Point",
    },
    coordinates: [Number],
    address: String,
    district: {
        type: mongoose.Types.ObjectId,
        ref: "District",
        required: [true, "Location must has a district"],
    },
    select: false,
});

module.exports = locationSchema;
