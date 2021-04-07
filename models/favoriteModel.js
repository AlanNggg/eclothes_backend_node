const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true,
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

// favoriteSchema.index({ user: 1, post: 1 }, { unique: true });

favoriteSchema.post("save", async function (doc, next) {
    // Call the populate on a DOC NEED TO CALL execPopulate
    await doc
        .populate({
            path: "product",
            select: "-__v",
        })
        .execPopulate();
    next();
});

favoriteSchema.pre(/^find/, function (next) {
    this.populate({
        path: "product",
        select: "-__v",
    });
    next();
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
