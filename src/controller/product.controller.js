const productModel = require("../model/product.model");

const response = require("../helper/response.helper");
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

      response(res, data, 200, "Insert Product success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getProduct: async (req, res, next) => {
    try {
      const category = req.query.category || "";
      const seller = req.query.seller || "";
      const search = req.query.search || "";
      const sortBy = req.query.sortby || "product_id";
      const sortOrder = req.query.order || "asc";

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 6;
      const offset = (page - 1) * limit;

      const {
        rows: [count],
      } = await productModel.countProduct();

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);

      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      const { rows: product } = await productModel.getProduct(
        category,
        seller,
        search,
        sortBy,
        sortOrder,
        limit,
        offset
      );

      response(res, product, 200, "Get Product success", pagination);
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getOwnProduct: async (req, res, next) => {
    try {
      const {id} = req.decoded;

      const search = req.query.search || "";
      const sortBy = req.query.sortby || "product_id";
      const sortOrder = req.query.order || "asc";

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 6;
      const offset = (page - 1) * limit;

      const {
        rows: [count],
      } = await productModel.countProduct();

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);

      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      const { rows: product } = await productModel.getOwnProduct(
        id,
        search,
        sortBy,
        sortOrder,
        limit,
        offset
      );

      response(res, product, 200, "Get Own Product success", pagination);
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

      response(res, product, 200, "Get Product Detail success");
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

      response(res, product, 200, "Update Product success");
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

      response(res, product, 200, "Delete Product success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = productController;
