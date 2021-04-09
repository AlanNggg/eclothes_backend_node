const multer = require("multer");
const User = require("../models/userModel");
const catchError = require("../lib/catchError");
const ErrorResponse = require("../lib/ErrorResponse");
const { filterObject } = require("../lib/obj-lib");

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/photo/users");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(
            new ErrorResponse("Not an image. Please upload images only.", 400),
            false
        );
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

exports.uploadPhoto = upload.single("photo");

exports.getAllUsers = catchError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: "success",
        data: {
            users,
        },
    });
});

exports.getUserById = catchError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
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
        return ErrorResponse(
            "This route is not for updating password. Please use /reset-password"
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

// admin
exports.createUser = catchError(async (req, res, next) => {
    const newUser = await User.create(req.body);

    res.status(200).json({
        status: "success",
        data: {
            user: newUser,
        },
    });
});

exports.deleteUser = catchError(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: "success",
        data: {
            user: null,
        },
    });
});

exports.updateUser = catchError(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: "success",
        data: {
            merchant: updatedUser,
        },
    });
});
