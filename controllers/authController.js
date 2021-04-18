const { promisify } = require("util");
const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../lib/ErrorResponse");
const catchError = require("../lib/catchError");

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.sendToken = (user, statusCode, req, res) => {
    const token = createToken(user._id);

    if (req.originalUrl.includes("users")) {
        res.status(statusCode).json({
            token,
            user,
        });
    } else {
        res.status(statusCode).json({
            token,
            merchant: user,
        });
    }
};

exports.login = (Model) =>
    catchError(async (req, res, next) => {
        const { username, password } = req.body;

        if (!username || !password) {
            next(
                new ErrorResponse(
                    "Please provide username/email and password",
                    400
                )
            );
        }
        console.log(username);
        let user = await Model.findOne({ username }).select("+password");

        if (!user) {
            user = await Model.findOne({ email: username }).select("+password");
        }
        console.log(user);

        if (!user || !(await user.comparePassword(password, user.password))) {
            return next(new ErrorResponse("Incorrect email or password", 401));
        }

        this.sendToken(user, 200, req, res);
    });

exports.authorization = (Model) =>
    catchError(async (req, res, next) => {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            return next(
                ErrorResponse(
                    "You are not logged in. Please login to get access.",
                    401
                )
            );
        }

        const payload = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET
        );

        const user = await Model.findById(payload.id);
        if (!user) {
            return next(new ErrorResponse("The user does not exist!", 401));
        }

        if (user.changedPasswordAfter(payload.iat)) {
            return next(
                new ErrorResponse(
                    "User recently changed password. Please login again.",
                    401
                )
            );
        }

        req.user = user;
        next();
    });

exports.updatePassword = (Model) =>
    catchError(async (req, res, next) => {
        const user = await Model.findById(req.user.id).select("+password");

        if (
            !(await user.comparePassword(
                req.body.passwordCurrent,
                user.password
            ))
        ) {
            return next(
                new ErrorResponse("Your current password is wrong.", 401)
            );
        }

        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        await user.save();

        this.sendToken(user, 200, res);
    });

exports.resetPassword = (Model) =>
    catchError(async (req, res, next) => {
        const hashedToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user = await Model.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        });

        if (!user) {
            return next(new error("Token is invalid or has expired", 400));
        }

        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();

        this.sendToken(user, 200, res);
    });
