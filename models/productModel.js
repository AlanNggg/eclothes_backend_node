const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
            minlength: 1,
        },
        merchant: {
            type: mongoose.Types.ObjectId,
            ref: "Merchant",
            required: [true, "A product must belong to a merchant"],
        },
        photos: {
            type: [String],
            trim: true,
            default: ["product.png"],
        },
        price: {
            type: Number,
            required: [true, "A product must have a price"],
        },
        options: {
            color: [{ type: String, trim: true }],
            size: [{ type: String, trim: true }],
        },
        style: {
            type: String,
            trim: true,
            maxlength: 20,
            minlength: 1,
        },
        ratingsAverage: {
            type: Number,
            default: 4.5,
            min: [1, "Rating must be above 1.0"],
            max: [5, "Rating must be below 5.0"],
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: "ProductCategory",
            required: [true, "A product must be within the product categories"],
        },
        quantity: Number,
        description: {
            type: String,
            trim: true,
            default: "No description",
            maxlength: 100,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

productSchema.pre(/^find/, function (next) {
    this.populate({
        path: "merchant",
    }).populate({
        path: "category",
    });
    next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
