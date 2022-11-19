const express = require("express");
const router = express.Router();

const { insertProduct, getProduct, getProductDetail, updateProduct, deleteProduct } = require("../controller/product.controller");
const { jwtAuth } = require("../middleware/auth.middleware");
const { productUpload } = require("../middleware/multer.middleware");

router
.post("/", jwtAuth, productUpload.single("image"), insertProduct)
.get("/", getProduct)
.get("/:id", getProductDetail)
.put("/:id", updateProduct)
.delete("/:id", deleteProduct)

module.exports = router