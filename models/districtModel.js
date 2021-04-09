const mongoose = require("mongoose");

const districtSchema = mongoose.Schema({
    region: {
        type: mongoose.Types.ObjectId,
        ref: "Region",
        required: [true, "Region cannot be empty"],
    },
    district: {
        type: String,
        required: [true, "Please enter district name"],
        unique: true,
        trim: true,
        maxlength: 30,
        minlength: 1,
    },
});

districtSchema.pre(/^find/, function (next) {
    this.populate({
        path: "region",
    });

    next();
});

const District = mongoose.model("District", districtSchema);

module.exports = District;
