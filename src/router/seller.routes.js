const express = require("express");
const { register, login, getDetail, updateStore } = require("../controller/seller.controller");
const { userUpload } = require("../middleware/multer.middleware");
const router = express.Router();

router
.post("/register", register)
.post("/login", login)
.get("/:id", getDetail)
.put("/:id", userUpload.single("avatar"), updateStore)
// .delete("/:id", deleteStore)

module.exports = router