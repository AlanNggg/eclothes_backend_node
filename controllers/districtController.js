const District = require("../models/districtModel");

const catchError = require("../lib/catchError");

exports.getAllDistricts = catchError(async (req, res, next) => {
    const districts = await District.find();

    res.status(200).json({
        status: "success",
        data: {
            districts,
        },
    });
});

exports.createDistrict = catchError(async (req, res, next) => {
    const newDistrict = await District.create({
        district: req.body.district,
    });

    res.status(200).json({
        status: "success",
        data: {
            district: newDistrict,
        },
    });
});

exports.deleteDistrictById = catchError(async (req, res, next) => {
    await District.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: "success",
        data: {
            district: null,
        },
    });
});

exports.deleteDistrictByName = catchError(async (req, res, next) => {
    await District.findOneAndDelete({ region: req.params.name });

    res.status(200).json({
        status: "success",
        data: {
            district: null,
        },
    });
});
