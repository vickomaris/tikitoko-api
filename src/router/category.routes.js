const express = require("express");
const {
  insertCategory,
  getCategory,
  getCategoryDetail,
  updateCategory,
  deleteCategory,
} = require("../controller/category.controller");
const { categoryUpload } = require("../middleware/multer.middleware");
const router = express.Router();

router
  .post("/", categoryUpload.single("image"), insertCategory)
  .get("/", getCategory)
  .get("/:id", getCategoryDetail)
  .put("/:id", categoryUpload.single("image"), updateCategory)
  .delete("/:id", deleteCategory);

module.exports = router;
