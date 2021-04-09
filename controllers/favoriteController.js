const Favorite = require("../models/favoriteModel");

const catchError = require("../lib/catchError");

exports.getAllFavorites = catchError(async (req, res, next) => {
    const favorites = await Favorite.find();

    res.status(200).json({
        status: "success",
        data: {
            favorites,
        },
    });
});

exports.getFavorite = catchError(async (req, res, next) => {
    const favorite = await Favorite.findById(req.params.id);

    res.status(200).json({
        status: "success",
        data: {
            favorite,
        },
    });
});

// admin
exports.addFavorite = catchError(async (req, res, next) => {
    const favorite = await Favorite.create(req.body);

    res.status(200).json({
        status: "success",
        data: {
            favorite,
        },
    });
});

exports.removeFavorite = catchError(async (req, res, next) => {
    await Favorite.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: "success",
        data: {
            favorite: null,
        },
    });
});

// exports.removeFavoriteByProductId = async (req, res, next) => {
//
//       let filter = {};
//       const { post } = req.body;
//       if (!post) {
//         return next(new error("Please provide postId", 400));
//       }
//       filter = { post, user: req.user.id };

//       await Favorite.findOneAndDelete(filter);

//       res.status(200).json({
//         status: "success",
//         data: null,
//       });
//     } catch (err) {
//       next(err);
//     }
//   };
