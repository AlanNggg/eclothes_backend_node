const mongoose = require("mongoose");

const productCategorySchema = mongoose.Schema({
    category: {
        type: String,
        required: [true, "Please enter product category name"],
        unique: true,
        trim: true,
        maxlength: 30,
        minlength: 1,
    },
});

const ProductCategory = mongoose.model(
    "ProductCategory",
    productCategorySchema,
    "productCategories"
);

module.exports = ProductCategory;
