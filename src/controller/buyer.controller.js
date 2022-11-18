const buyerModel = require("../model/buyer.model");

const { v4: uuid } = require("uuid");
const { hash, compare } = require("bcryptjs");
const createError = require("http-errors");

const buyerController = {
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
};

module.exports = buyerController;
