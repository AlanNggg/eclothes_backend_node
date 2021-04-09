const crypto = require("crypto"); // built-in
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const locationSchema = require("./locationModel");

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please enter your first name"],
            trim: true,
            maxlength: 20,
            minlength: 1,
        },
        lastName: {
            type: String,
            required: [true, "Please enter your last name"],
            trim: true,
            maxlength: 20,
            minlength: 1,
        },
        username: {
            type: String,
            // required: [true, "Please enter your username"],
            // unique: true,
            trim: true,
            maxlength: 20,
            minlength: 1,
        },
        phone: {
            type: String,
            required: [true, "Please enter your phone number"],
            unique: true,
            trim: true,
            maxlength: 16,
            minlength: 8,
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true,
            trim: true,
            lowercase: true,
            validate: [validator.isEmail, "Please provide a valid email"],
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
        gender: {
            type: String,
            enum: ["male", "female"],
            required: [true, "Please enter your gender"],
        },
        photo: {
            type: String,
            trim: true,
            default: "userAvator.png",
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        active: {
            type: Boolean,
            default: true,
            select: false,
        },
        shippingAddress: {
            type: locationSchema,
            select: false,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

userSchema.pre(/^find/, function (next) {
    this.populate("shippingAddress.district");
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
