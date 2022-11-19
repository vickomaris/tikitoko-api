const express = require("express");
const { register, login } = require("../controller/seller.controller");
const router = express.Router();

router
.post("/register", register)
.post("/login", login)
// .get
// .put
// .delete

module.exports = router