const express = require("express");

const commentController = require("../controllers/commentController");
const userAuthController = require("../controllers/userAuthController");

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(commentController.getAllComments)
    .post(commentController.createComment);

router
    .route("/:id")
    .get(commentController.getComment)
    .delete(commentController.deleteComment);

module.exports = router;
