const API = require("../lib/API");
const catchError = require("../lib/catchError");

exports.getAll = (Model) =>
    catchError(async (req, res, next) => {
        let filter = {};
        // GET /products/:productId/comments
        if (req.params.productId) filter = { product: req.params.productId };
        // GET /merchants/:merchantId/products
        // GET /merchants/:userId/followings
        if (req.params.merchantId) filter = { merchant: req.params.merchantId };
        // GET /users/:userId/followings
        // GET /users/:userId/favorites
        if (req.params.userId) filter = { user: req.params.userId };

        const api = new API(Model.find(filter), req.query)
            .filter()
            .sort()
            .select()
            .paginate();

        const data = await api.query;

        res.status(200).json({
            status: "success",
            results: data.length,
            data: {
                data,
            },
        });
    });

exports.getOne = (Model) =>
    catchError(async (req, res, next) => {
        const data = await Model.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                data,
            },
        });
    });

exports.createOne = (Model) =>
    catchError(async (req, res, next) => {
        const data = await Model.create(req.body);

        res.status(200).json({
            status: "success",
            data: {
                data,
            },
        });
    });

exports.updateOne = (Model) =>
    catchError(async (req, res, next) => {
        const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: "success",
            data: {
                data,
            },
        });
    });

exports.deleteOne = (Model) =>
    catchError(async (req, res, next) => {
        const data = await Model.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: "success",
            data: null,
        });
    });
