const express = require("express")
const router = express.Router()
const ProductsController = require("../controllers/products")
const passport = require('passport');

router.get("/", passport.authenticate("jwt", { session: false }), ProductsController.getProducts)
router.get("/:id", ProductsController.getProductById)
router.post("/", ProductsController.createProduct)
router.put("/:id", ProductsController.updateProduct)
router.delete("/:id", ProductsController.deleteProduct)

module.exports = router;
