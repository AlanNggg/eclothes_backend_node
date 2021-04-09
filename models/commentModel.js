const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            required: [true, "Comment must belong to a user"],
            ref: "User",
        },
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: [true, "Comment must belong to a product"],
        },
        comment: {
            type: String,
            required: [true, "Comment cannot be empty"],
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

commentSchema.post("save", async function (doc, next) {
    // Call the populate on a DOC NEED TO CALL execPopulate
    await doc
        .populate({
            path: "product",
        })
        .populate({
            path: "user",
            select:
                "-email -passwordChangedAt -passwordResetExpires -passwordResetToken",
        })
        .execPopulate();
    next();
});

commentSchema.pre(/^find/, function (next) {
    this.populate({
        path: "product",
    }).populate({
        path: "user",
        select:
            "-email -passwordChangedAt -passwordResetExpires -passwordResetToken",
    });

    next();
});
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
