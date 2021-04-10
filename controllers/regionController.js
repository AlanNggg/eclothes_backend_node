const Region = require("../models/regionModel");
const catchError = require("../lib/catchError");
const controllerFactory = require("./controllerFactory");

// admin
exports.deleteRegionByName = catchError(async (req, res, next) => {
    await Region.findOneAndDelete({ region: req.params.name });

    res.status(200).json({
        status: "success",
        data: {
            region: null,
        },
    });
});

// public
exports.getAllRegions = controllerFactory.getAll(Region);

// admin
exports.createRegion = controllerFactory.createOne(Region);

exports.deleteRegionById = controllerFactory.getOne(Region);
