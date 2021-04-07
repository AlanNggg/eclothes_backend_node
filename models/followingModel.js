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

// followSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "follower",
//     select: "name avator info",
//   }).populate({
//     path: "following",
//     select: "name avator info",
//   });

//   next();
// });

followingSchema.index({ user: 1, merchant: 1 }, { unique: true });

const Following = mongoose.model("Follow", followingSchema);

module.exports = Following;
