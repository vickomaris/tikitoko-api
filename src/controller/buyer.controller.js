const buyerModel = require("../model/buyer.model");

const { v4: uuid } = require("uuid");
const { hash, compare } = require("bcryptjs");
const createError = require("http-errors");

const buyerController = {
  // auth
  register: async (req, res, next) => {
    try {
      const id = uuid();
      const { name, email, password } = req.body;

      const { rowCount: check } = await buyerModel.emailCheck(email);

      if (check) {
        next(new createError(403, "E-mail already in use"));
      }

      const hashedPassword = await hash(password, 10);

      const data = {
        id,
        name,
        email,
        password: hashedPassword,
      };

      await buyerModel.register(data);

      delete data.password;

      res.json({
        msg: "register success",
        data: data,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const data = await buyerModel.emailCheck(email);
      const { rowCount: check } = data;
      console.log(check);

      if (!check) {
        next(new createError(403, "E-mail not registered"));
      }

      const {
        rows: [buyer],
      } = data;
      const savedPassword = buyer.password;

      const valid = await compare(password, savedPassword);

      if (!valid) {
        return next(createError(403, "E-mail or password incorrect!"));
      }

      delete buyer.password;

      res.json({
        msg: "Login success",
        data: buyer,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [buyer],
      } = await buyerModel.getDetail(id);

      delete buyer.password;

      res.json({
        msg: "Get Buyer Detail success",
        data: buyer,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  updateAccount: async (req, res, next) => {
    try {
      const { id } = req.params;

      const { name, email, phone, gender, birthdate } = req.body;
      const date = new Date();
      let avatar = null;

      if (req.file) {
        avatar = `http://${req.get("host")}/ava/${req.file.filename}`;
      }

      const data = {
        id,
        name,
        email,
        phone,
        gender,
        birthdate,
        avatar,
        date,
      };

      await buyerModel.updateAccount(data);

      const {
        rows: [buyer],
      } = await buyerModel.getDetail(id);

      delete buyer.password;

      res.json({
        msg: "Update Buyer success",
        data: buyer
      })
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  deleteAccount: async (req, res, next) => {
    try {
      const {id} = req.params

      const {
        rows: [buyer],
      } = await buyerModel.getDetail(id);

      delete buyer.password;

      await buyerModel.deleteAccount(id)

      res.json({
        msg: "Delete Buyer success",
        data: buyer
      })
    } catch (error) {
      console.log(error)
      next(new createError.InternalServerError())
    }
  }
};

module.exports = buyerController;
