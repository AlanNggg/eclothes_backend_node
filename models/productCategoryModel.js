const mongoose = require("mongoose");

const productCategorySchema = mongoose.Schema({
    category: {
        type: String,
        required: [true, "Please enter product category name"],
        trim: true,
        maxlength: 30,
        minlength: 1,
    },
});

const ProductCategory = mongoose.model(
    "ProductCategory",
    productCategorySchema
);

module.exports = ProductCategory;
