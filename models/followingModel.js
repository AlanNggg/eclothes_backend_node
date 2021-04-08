const mongoose = require("mongoose");

const followingSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        merchant: {
            type: mongoose.Types.ObjectId,
            ref: "Merchant",
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

followingSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
    }).populate({
        path: "merchant",
    });

    next();
});

followingSchema.index({ user: 1, merchant: 1 }, { unique: true });

const Following = mongoose.model("Following", followingSchema);

module.exports = Following;
