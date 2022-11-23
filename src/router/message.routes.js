const express = require("express");
const router = express.Router();

const {jwtAuth} = require("../middleware/auth.middleware");
const { getMessage } = require("../controller/message.controller");

router
.get("/:id", jwtAuth, getMessage);

module.exports = router;
