const Comment = require("../models/commentModel");
const catchError = require("../lib/catchError");
const controllerFactory = require("./controllerFactory");

exports.setProductUserIds = (req, res, next) => {
    // POST /products/:productId/comment
    if (!req.body.product) req.body.product = req.params.productId;
    if (!req.body.user) req.body.user = req.user.id;

    next();
};

exports.getAllComments = controllerFactory.getAll(Comment);

exports.getComment = controllerFactory.getOne(Comment);

exports.createComment = controllerFactory.createOne(Comment);

exports.deleteComment = controllerFactory.deleteOne(Comment);
