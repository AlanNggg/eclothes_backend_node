const express = require("express");

const followingController = require("../controllers/followingController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(followingController.getAllFollowings)
    .post(followingController.addFollowing);

router.route("/:id").delete(followingController.removeFollowing);

module.exports = router;
