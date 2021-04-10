const District = require("../models/districtModel");
const catchError = require("../lib/catchError");
const controllerFactory = require("./controllerFactory");

exports.deleteDistrictByName = catchError(async (req, res, next) => {
    await District.findOneAndDelete({ region: req.params.name });

    res.status(200).json({
        status: "success",
        data: {
            district: null,
        },
    });
});

exports.getAllDistricts = controllerFactory.getAll(District);

exports.createDistrict = controllerFactory.createOne(District);

exports.deleteDistrictById = controllerFactory.getOne(District);
