const express = require("express");
const {
  insertCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category.controller");
const { categoryUpload } = require("../middleware/multer.middleware");
const router = express.Router();

router
  .post("/", insertCategory)
  .get("/", getCategory)
  .put("/:id", categoryUpload.single("image"), updateCategory)
  .delete("/:id", deleteCategory);

module.exports = router;
