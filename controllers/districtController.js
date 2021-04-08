const District = require("../models/districtModel");

exports.getAllDistricts = async (req, res, next) => {
    try {
        const districts = await District.find();

        res.status(200).json({
            status: "success",
            data: {
                districts,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.createDistrict = async (req, res, next) => {
    try {
        const newDistrict = await District.create({
            district: req.body.district,
        });

        res.status(200).json({
            status: "success",
            data: {
                district: newDistrict,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteDistrictById = async (req, res, next) => {
    try {
        await District.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                district: null,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteDistrictByName = async (req, res, next) => {
    try {
        await District.findOneAndDelete({ region: req.params.name });

        res.status(200).json({
            status: "success",
            data: {
                district: null,
            },
        });
    } catch (err) {
        next(err);
    }
};
