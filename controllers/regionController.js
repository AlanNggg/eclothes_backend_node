const Region = require("../models/regionModel");

exports.getAllRegions = async (req, res, next) => {
    try {
        const regions = await Region.find();

        res.status(200).json({
            status: "success",
            data: {
                regions,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.createRegion = async (req, res, next) => {
    try {
        const newRegion = await Region.create({
            region: req.body.region,
        });

        res.status(200).json({
            status: "success",
            data: {
                region: newRegion,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteRegionById = async (req, res, next) => {
    try {
        await Region.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                region: null,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteRegionByName = async (req, res, next) => {
    try {
        await Region.findOneAndDelete({ region: req.params.name });

        res.status(200).json({
            status: "success",
            data: {
                region: null,
            },
        });
    } catch (err) {
        next(err);
    }
};
