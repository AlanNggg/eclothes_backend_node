const express = require("express");
const userController = require("../controllers/userController");
const userAuthController = require("../controllers/userAuthController");

const router = express.Router();

router.post("/register", userAuthController.register);
router.post("/login", userAuthController.login);

router.route("/").get(userController.getAllUsers).post();

router
    .route("/:id")
    .get(userController.getUserById)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router.route("/by/username/:name").get(userController.getUserByUsername);

module.exports = router;
