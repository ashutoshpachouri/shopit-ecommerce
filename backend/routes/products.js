const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts
} = require("../controllers/productControllers");

router.route("/products").get(getProducts);
router.route("/admin/products").get(getAdminProducts);
router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  newProduct
);
router.get("/product/:id", getSingleProduct);
router.put(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProduct
);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);
router.put("/review", isAuthenticatedUser, createProductReview);
router.get("/reviews", isAuthenticatedUser, getProductReviews);
router.delete("/reviews", isAuthenticatedUser, deleteReview);

module.exports = router;
