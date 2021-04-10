const express = require("express");

const followingController = require("../controllers/followingController");
const userAuthController = require("../controllers/userAuthController");

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(followingController.getAllFollowings)
    .post(
        userAuthController.authorization,
        followingController.setUserId,
        followingController.addFollowing
    );

router
    .route("/:id")
    .get(followingController.getFollowing)
    .delete(
        userAuthController.authorization,
        followingController.removeFollowing
    );

module.exports = router;
