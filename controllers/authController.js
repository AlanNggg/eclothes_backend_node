const jwt = require("jsonwebtoken");
const ErrorResponse = require("../lib/ErrorResponse");
const catchError = require("../lib/catchError");

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.login = (Model) =>
    catchError(async (req, res, next) => {
        const { email, password } = req.body;

        if (!email || !password) {
            next(new ErrorResponse("Please provide email and password", 400));
        }

        const user = await Model.findOne({ email }).select("+password");

        if (!user || !(await user.comparePassword(password, user.password))) {
            return next(new ErrorResponse("Incorrect email or password", 401));
        }

        const token = createToken(user._id);

        res.status(200).json({
            status: "success",
            token,
            data: {
                user,
            },
        });
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

        createToken(user, 200, res);
    });
