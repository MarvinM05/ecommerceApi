const { Router } = require("express");
const { addProductToCart, buyProductsCart } = require("../controllers/cart.controllers");

const router = Router();

router.post("/products/cart/:id", addProductToCart);

router.post('/products/order', buyProductsCart)

module.exports = router;
