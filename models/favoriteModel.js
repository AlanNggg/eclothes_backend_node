const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "Favorite must belong to a user"],
        },
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: [true, "Favorite must belong to a product"],
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

favoriteSchema.post("save", async function (doc, next) {
    // Call the populate on a DOC NEED TO CALL execPopulate
    await doc
        .populate({
            path: "user",
        })
        .populate({
            path: "product",
        })
        .execPopulate();
    next();
});

favoriteSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
    }).populate({
        path: "product",
    });
    next();
});

favoriteSchema.index({ user: 1, product: 1 }, { unique: true });
const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
