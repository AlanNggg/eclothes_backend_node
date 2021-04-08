const Following = require("../models/followingModel");

exports.getAllFollowings = async (req, res, next) => {
    try {
        const followings = await Following.find();

        res.status(200).json({
            status: "success",
            data: {
                followings,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.addFollowing = async (req, res, next) => {
    try {
        const following = await Following.create(req.body);

        res.status(200).json({
            status: "success",
            data: {
                following,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.removeFollowing = async (req, res, next) => {
    try {
        const following = await Following.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                following: null,
            },
        });
    } catch (err) {
        next(err);
    }
};
