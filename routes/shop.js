const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");
const { isAuth } = require("../middlewares/auth");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);
router.get("/products/:product_id", shopController.getProduct);

router.get("/cart", isAuth, shopController.getCart);
router.post("/cart", isAuth, shopController.postCart);
router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);

router.get("/orders", isAuth, shopController.getOrders);
router.post("/create-order", isAuth, shopController.postOrder);

router.post("/checkout", isAuth, shopController.postCheckout);
router.get("/success", isAuth, shopController.postOrder);

router.get("/invoice/:orderId", isAuth, shopController.getInvoice);

// router.get("/checkout", shopController.getCheckout);

module.exports = router;
