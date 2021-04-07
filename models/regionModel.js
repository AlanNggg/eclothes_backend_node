const mongoose = require("mongoose");

const regionSchema = mongoose.Schema({
    region: {
        type: String,
        required: [true, "Please enter region name"],
        trim: true,
        maxlength: 30,
        minlength: 1,
    },
});

const Region = mongoose.model("Region", regionSchema);

module.exports = Region;
