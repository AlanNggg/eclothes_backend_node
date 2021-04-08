const Favorite = require("../models/favoriteModel");

exports.getAllFavorites = async (req, res, next) => {
    try {
        const favorites = await Favorite.find();

        res.status(200).json({
            status: "success",
            data: {
                favorites,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.addFavorite = async (req, res, next) => {
    try {
        const favorite = await Favorite.create({
            user: req.user.id,
            product: req.body.product,
        });

        res.status(200).json({
            status: "success",
            data: {
                favorite,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.removeFavorite = async (req, res, next) => {
    try {
        await Favorite.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        next(err);
    }
};

// exports.removeFavoriteByProductId = async (req, res, next) => {
//     try {
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
