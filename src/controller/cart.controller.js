const cartModel = require("../model/cart.model");

const { v4: uuid } = require("uuid");
const createError = require("http-errors");

const cartController = {
  insertCart: async (req, res, next) => {
    try {
      const id = uuid();
      const { id: bid } = req.decoded;
      const { pid, qty } = req.body;

      const data = {
        id,
        bid,
        pid,
        qty,
      };

      console.log(data);

      await cartModel.insertCart(data);

      res.json({
        msg: "Insert Cart success",
        data: data,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getCart: async (req, res, next) => {
    try {
      const { id } = req.decoded;
      const { rows: cart } = await cartModel.getCart(id);

      res.json({
        msg: "Get Cart success",
        data: cart,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  updateCart: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { qty, status } = req.body;
      const date = new Date();

      const data = {
        id,
        qty,
        status,
        date,
      };

      await cartModel.updateCart(data);

      const {
        rows: [cart],
      } = await cartModel.getCartDetail(id);

      res.json({
        msg: "Update Cart success",
        data: cart,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  deleteCart: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [cart],
      } = await cartModel.getCartDetail(id);

      await cartModel.deleteCart(id);

      res.json({
        msg: "Delete Cart success",
        data: cart,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = cartController;
