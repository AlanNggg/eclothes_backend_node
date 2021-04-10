const express = require("express");

const commentController = require("../controllers/commentController");
const userAuthController = require("../controllers/userAuthController");

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(commentController.getAllComments)
    .post(
        userAuthController.authorization,
        commentController.setProductUserIds,
        commentController.createComment
    );

router
    .route("/:id")
    .get(commentController.getComment)
    .delete(userAuthController.authorization, commentController.deleteComment);

module.exports = router;
