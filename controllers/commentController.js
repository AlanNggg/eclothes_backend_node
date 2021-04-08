const Comment = require("../models/commentModel");

exports.getAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.find();

        res.status(200).json({
            status: "success",
            results: comments.length,
            data: {
                comments,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.getComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                comment,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.createComment = async (req, res, next) => {
    try {
        const comment = await Comment.create(req.body);

        res.status(200).json({
            status: "success",
            data: {
                comment,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteComment = async (req, res, next) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                comment: null,
            },
        });
    } catch (err) {
        next(err);
    }
};
