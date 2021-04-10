const express = require("express");
const productController = require("../controllers/productController");
const merchantAuthController = require("../controllers/merchantAuthController");
const commentRoutes = require("./commentRoutes");
const router = express.Router({ mergeParams: true });

router.use("/:productId/comments", commentRoutes);

router
    .route("/")
    .get(productController.getAllProducts)
    .post(
        merchantAuthController.authorization,
        productController.setMerchantId,
        productController.createProduct
    );

router
    .route("/:id")
    .get(productController.getProductById)
    .patch(
        merchantAuthController.authorization,
        productController.uploadProductPhotos,
        productController.resizeProductPhotos,
        productController.updateProduct
    )
    .delete(
        merchantAuthController.authorization,
        productController.deleteProduct
    );

module.exports = router;
