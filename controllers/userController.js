const sharp = require("sharp");
const User = require("../models/userModel");
const catchError = require("../lib/catchError");
const ErrorResponse = require("../lib/ErrorResponse");
const controllerFactory = require("./controllerFactory");
const { filterObject } = require("../lib/obj-lib");
const upload = require("../lib/imageHandler");

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchError(async (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/photo/users/${req.user.id}/${req.file.filename}`);

    next();
});

exports.getUserByUsername = catchError(async (req, res, next) => {
    const user = await User.findOne({
        username: req.params.name,
    });

    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

exports.updateCurrentUser = catchError(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new ErrorResponse(
                "This route is not for updating password. Please use /update-password"
            )
        );
    }

    const filteredBody = filterObject(
        req.body,
        "photo",
        "firstName",
        "lastName",
        "email",
        "phone"
    );

    if (req.file) filteredBody.photo = req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        filteredBody,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        status: "success",
        data: {
            user: updatedUser,
        },
    });
});

exports.deleteCurrentUser = catchError(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: "success",
        data: null,
    });
});

exports.getAllUsers = controllerFactory.getAll(User);

exports.getUserById = controllerFactory.getOne(User);

// admin
exports.createUser = controllerFactory.createOne(User);

exports.deleteUser = controllerFactory.deleteOne(User);

exports.updateUser = controllerFactory.updateOne(User);
