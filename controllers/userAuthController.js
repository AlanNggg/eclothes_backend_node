const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const authController = require("../controllers/authController");
const ErrorResponse = require("../lib/ErrorResponse");
const catchError = require("../lib/catchError");

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
exports.register = catchError(async (req, res, next) => {
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    const token = createToken(newUser._id);

    res.status(201).json({
        status: "success",
        token,
        data: {
            user: newUser,
        },
    });
});

exports.login = authController.login(User);

exports.authorization = authController.authorization(User);

exports.allow = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    "You do not have permission to perform this action",
                    403
                )
            );
        }

        next();
    };
};

exports.forgotPassword = catchError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new error("There is no user with email address.", 404));
    }

    const resetToken = user.createPasswordResetToken();

    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/users/resetpassword/${resetToken}`;

    try {
        const options = {
            email: user.email,
            subject: "Interesgram password reset token (valid for 10 min)",
            message: `Please submit a PATCH request with your new password and passwordConfirm to :${resetURL}.\nIf you didn't forget your password, please ignore this email!`,
        };

        await sendEmail(options);

        res.status(200).json({
            status: "success",
            message: "Reset Token sent to email!",
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save({ validateBeforeSave: false });

        return next(
            new error("There was an error sending email. Try again later!", 500)
        );
    }
});

exports.resetPassword = authController.resetPassword(User);
