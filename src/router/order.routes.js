const express = require("express");
const router = express.Router();

const { jwtAuth } = require("../middleware/auth.middleware");
const { insertOrder, getOrder, getOrderDetail, updateOrder, deleteOrder, getOwnOrder } = require("../controller/order.controller");

router
.post("/", jwtAuth, insertOrder)
.get("/", jwtAuth, getOrder)
.get("/myorder", jwtAuth, getOwnOrder)
.get("/:id", getOrderDetail)
.put("/:id", updateOrder)
.delete("/:id", deleteOrder)

module.exports = router;
