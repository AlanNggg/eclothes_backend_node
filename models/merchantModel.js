const crypto = require("crypto"); // built-in
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// lastName, firstName & username for 商店管理者
// shopName 商店名
const merchantSchema = mongoose.Schema(
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
            required: [true, "Please enter your username"],
            unique: true,
            trim: true,
            maxlength: 20,
            minlength: 1,
        },
        shopName: {
            type: String,
            required: [true, "Please enter your shop name"],
            unique: true,
            trim: true,
            maxlength: 20,
            minlength: 1,
        },
        location: {
            type: {
                type: String,
                default: "Point",
                enum: ["Point"],
            },
            coordinates: [Number],
            address: String,
            district: {
                type: mongoose.Types.ObjectId,
                ref: "District",
                required: true,
            },
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true,
            trim: true,
        },
        phone: {
            type: String,
            required: [true, "Please enter your phone number"],
            unique: true,
            trim: true,
            maxlength: 16,
            minlength: 8,
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
        photo: {
            type: String,
            trim: true,
            default: "merchantAvator.png",
        },
        description: {
            type: String,
            default: "No description",
            maxlength: 100,
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        active: {
            type: Boolean,
            default: true,
            select: false,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

merchantSchema.pre(/^find/, function (next) {
    this.select("-__v");
    next();
});
merchantSchema.pre(/^find/, function (next) {
    this.populate({
        path: "location.district",
    });
    next();
});

merchantSchema.pre("save", async function (next) {
    // Only run if password was modified or sign up
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;

    if (this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

merchantSchema.methods.comparePassword = async function (
    inputPassword,
    userPassword
) {
    return await bcrypt.compare(inputPassword, userPassword);
};

merchantSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }
};

merchantSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};
const Merchant = mongoose.model("Merchant", merchantSchema);

module.exports = Merchant;
