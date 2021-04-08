const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({
            status: "success",
            data: {
                users,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.getUserByUsername = async (req, res, next) => {
    try {
        console.log(req.params.name);
        const user = await User.findOne({
            username: req.params.name,
        });

        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

// admin
exports.deleteUser = async (req, res, next) => {
    try {
        const merchant = await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                user: null,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            status: "success",
            data: {
                merchant: updatedUser,
            },
        });
    } catch (err) {
        next(err);
    }
};
