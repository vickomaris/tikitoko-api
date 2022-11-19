const express = require("express");
const { register, login, getDetail } = require("../controller/seller.controller");
const router = express.Router();

router
.post("/register", register)
.post("/login", login)
.get("/:id", getDetail)
// .put("/:id", updateStore)
// .delete("/:id", deleteStore)

module.exports = router