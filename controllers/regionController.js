const Region = require("../models/regionModel");

const catchError = require("../lib/catchError");

// public
exports.getAllRegions = catchError(async (req, res, next) => {
    const regions = await Region.find();

    res.status(200).json({
        status: "success",
        data: {
            regions,
        },
    });
});

// admin
exports.createRegion = catchError(async (req, res, next) => {
    const newRegion = await Region.create({
        region: req.body.region,
    });

    res.status(200).json({
        status: "success",
        data: {
            region: newRegion,
        },
    });
});

exports.deleteRegionById = catchError(async (req, res, next) => {
    await Region.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: "success",
        data: {
            region: null,
        },
    });
});

exports.deleteRegionByName = catchError(async (req, res, next) => {
    await Region.findOneAndDelete({ region: req.params.name });

    res.status(200).json({
        status: "success",
        data: {
            region: null,
        },
    });
});
