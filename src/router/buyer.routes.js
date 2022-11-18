const express = require("express");
const router = express.Router();

const { register, login } = require("../controller/buyer.controller");

router
.post("/register", register)
.post("/login", login)
// .get
// .put
// .delete

module.exports = router