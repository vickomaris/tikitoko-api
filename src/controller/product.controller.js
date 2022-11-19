const productModel = require("../model/product.model");

const { v4: uuid } = require("uuid");
const createError = require("http-errors");

const productController = {
  insertProduct: async (req, res, next) => {
    try {
      const id = uuid();
      const { id: sid } = req.decoded;
      const { cid, name, price, stock, condition, description } = req.body;
      let image = null;

      if (req.file) {
        image = `http://${req.get("host")}/p-img/${req.file.filename}`;
      }

      const data = {
        id,
        sid,
        cid,
        name,
        price,
        stock,
        condition,
        description,
        image,
      };

      await productModel.insertProduct(data);

      res.json({
        msg: "Insert Product success",
        data: data,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getProduct: async (req, res, next) => {
    try {
      const { rows: product } = await productModel.getProduct();

      res.json({
        msg: "Get Product success",
        data: product,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getProductDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [product],
      } = await productModel.getProductDetail(id);

      res.json({
        msg: "Get Product Detail success",
        data: product,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { cid, name, price, stock, condition, description } = req.body;
      const date = new Date();
      let image = null;

      if (req.file) {
        image = `http://${req.get("host")}/p-img/${req.file.filename}`;
      }

      const data = {
        id,
        cid,
        name,
        price,
        stock,
        condition,
        description,
        image,
        date,
      };

      await productModel.updateProduct(data);

      const {
        rows: [product],
      } = await productModel.getProductDetail(id);

      res.json({
        msg: "Update Product success",
        data: product,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [product],
      } = await productModel.getProductDetail(id);

      await productModel.deleteProduct(id);

      res.json({
        msg: "Delete Product success",
        data: product,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = productController;
