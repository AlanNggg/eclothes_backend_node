const crypto = require("crypto"); // built-in
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            unique: true,
            trim: true,
            maxlength: 20,
            minlength: 1,
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
            trim: true,
            minlength: 8,
            select: false,
        },
        passwordConfirm: {
            type: String,
            required: [true, "Please confirm your password"],
            validate: {
                validator: function (el) {
                    return el === this.password;
                },
                message: "Passwords are not the same",
            },
        },
        avator: {
            type: String,
            trim: true,
            default: "avator.png",
        },
        info: {
            type: String,
            default: "This person is lazy.",
            maxlength: 100,
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

userSchema.pre(/^find/, function (next) {
    this.select("-__v");
    next();
});

userSchema.pre("save", async function (next) {
    // Only run if password was modified or sign up
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;

    if (this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.methods.comparePassword = async function (
    inputPassword,
    userPassword
) {
    return await bcrypt.compare(inputPassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
