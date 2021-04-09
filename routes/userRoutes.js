const express = require("express");
const multer = require("multer");
const userController = require("../controllers/userController");
const userAuthController = require("../controllers/userAuthController");

const router = express.Router();

router.post("/register", userAuthController.register);
router.post("/login", userAuthController.login);

router.post("/forgot-password", userAuthController.forgotPassword);
router.post("/reset-password/:token", userAuthController.resetPassword);

router.patch(
    "/me/update-password",
    userAuthController.authorization,
    userAuthController.updatePassword
);

router
    .patch(
        "/me",
        userAuthController.authorization,
        userController.uploadPhoto,
        userController.updateCurrentUser
    )
    .delete(userAuthController.authorization, userController.deleteCurrentUser);

router
    .route("/")
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route("/:id")
    .get(userController.getUserById)
    .patch(
        userAuthController.authorization,
        userAuthController.allow("admin"),
        userController.updateUser
    )
    .delete(
        userAuthController.authorization,
        userAuthController.allow("admin"),
        userController.deleteUser
    );

router.route("/by/username/:name").get(userController.getUserByUsername);

module.exports = router;
