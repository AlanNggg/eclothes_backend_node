const Favorite = require("../models/favoriteModel");
const catchError = require("../lib/catchError");
const controllerFactory = require("./controllerFactory");

exports.setUserId = (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id;

    next();
};

exports.getAllFavorites = controllerFactory.getAll(Favorite);

exports.getFavorite = controllerFactory.getOne(Favorite);

exports.addFavorite = controllerFactory.createOne(Favorite);

exports.removeFavorite = controllerFactory.deleteOne(Favorite);

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
