const Following = require("../models/followingModel");

const catchError = require("../lib/catchError");

exports.getAllFollowings = catchError(async (req, res, next) => {
    const followings = await Following.find();

    res.status(200).json({
        status: "success",
        data: {
            followings,
        },
    });
});

exports.getFollowing = catchError(async (req, res, next) => {
    const following = await Following.findById(req.params.id);

    res.status(200).json({
        status: "success",
        data: {
            following,
        },
    });
});

exports.addFollowing = catchError(async (req, res, next) => {
    const following = await Following.create(req.body);

    res.status(200).json({
        status: "success",
        data: {
            following,
        },
    });
});

exports.removeFollowing = catchError(async (req, res, next) => {
    const following = await Following.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: "success",
        data: {
            following: null,
        },
    });
});
