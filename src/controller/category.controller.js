const categoryModel = require("../model/category.model");

const createError = require("http-errors");

const categoryController = {
  insertCategory: async (req, res, next) => {
    try {
      const { name } = req.body;
      let image = null;

      if (req.file) {
        image = `http://${req.get("host")}/c-img/${req.file.filename}`;
      }

      const data = {
        name,
        image,
      };

      await categoryModel.insertCategory(data);

      res.json({
        msg: "Insert Category success",
        data: data,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getCategory: async (req, res, next) => {
    try {
      const { rows: categories } = await categoryModel.getCategory();

      res.json({
        msg: "Get Category success",
        data: categories,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getCategoryDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [category],
      } = await categoryModel.getCategoryDetail(id);

      res.json({
        msg: "Get Category success",
        data: category,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  updateCategory: async (req, res, next) => {
    try {
      const { id } = req.params;

      const { name } = req.body;
      let image;

      if (req.file) {
        image = `http://${req.get("host")}/c-img/${req.file.filename}`;
      }

      const data = {
        name,
        image,
      };

      await categoryModel.updateCategory(data);

      const {
        rows: [category],
      } = await categoryModel.getCategoryDetail(id);

      res.json({
        msg: "Update Category success",
        data: category,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  deleteCategory: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [category],
      } = await categoryModel.getCategoryDetail(id);

      await categoryModel.deleteCategory(id);

      res.json({
        msg: "Delete Category success",
        data: category,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = categoryController;
