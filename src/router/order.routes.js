const express = require("express");
const router = express.Router();

const { jwtAuth } = require("../middleware/auth.middleware");
const { insertOrder, getOrder, getOrderDetail, updateOrder, deleteOrder } = require("../controller/order.controller");

router
.post("/", jwtAuth, insertOrder)
.get("/", jwtAuth, getOrder)
.get("/:id", getOrderDetail)
.put("/:id", updateOrder)
.delete("/:id", deleteOrder)

module.exports = router;
