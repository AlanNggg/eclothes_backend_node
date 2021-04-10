const Following = require("../models/followingModel");
const catchError = require("../lib/catchError");
const controllerFactory = require("./controllerFactory");

// POST /followings
exports.setUserId = (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id;

    next();
};

exports.getAllFollowings = controllerFactory.getAll(Following);

exports.getFollowing = controllerFactory.getOne(Following);

exports.addFollowing = controllerFactory.createOne(Following);

exports.removeFollowing = controllerFactory.deleteOne(Following);
