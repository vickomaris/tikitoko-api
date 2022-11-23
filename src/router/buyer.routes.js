const express = require("express");
const router = express.Router();

const { register, login, getDetail, updateAccount, deleteAccount, getBuyer } = require("../controller/buyer.controller");
const { userUpload } = require("../middleware/multer.middleware");

router
.post("/register", register)
.post("/login", login)
.get("/", getBuyer)
.get("/:id", getDetail)
.put("/:id", userUpload.single("avatar"), updateAccount)
.delete("/:id", deleteAccount)

module.exports = router