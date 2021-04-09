const Comment = require("../models/commentModel");

const catchError = require("../lib/catchError");

exports.getAllComments = catchError(async (req, res, next) => {
    const comments = await Comment.find();

    res.status(200).json({
        status: "success",
        results: comments.length,
        data: {
            comments,
        },
    });
});

exports.getComment = catchError(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id);

    res.status(200).json({
        status: "success",
        data: {
            comment,
        },
    });
});

exports.createComment = catchError(async (req, res, next) => {
    const comment = await Comment.create(req.body);

    res.status(200).json({
        status: "success",
        data: {
            comment,
        },
    });
});

exports.deleteComment = catchError(async (req, res, next) => {
    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: "success",
        data: {
            comment: null,
        },
    });
});
