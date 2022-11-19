const sellerModel = require("../model/seller.model")

const { v4: uuid } = require("uuid");
const { hash, compare } = require("bcryptjs");
const createError = require("http-errors");

const sellerController = {
    register: async (req, res, next) => {
        try {
          const id = uuid();
          const { name, email, phone, password } = req.body;
    
          const { rowCount: check } = await sellerModel.emailCheck(email);
    
          if (check) {
            next(new createError(403, "E-mail already in use"));
          }
    
          const hashedPassword = await hash(password, 10);
    
          const data = {
            id,
            name,
            email,
            phone,
            password: hashedPassword,
          };
    
          await sellerModel.register(data);
    
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
    
          const data = await sellerModel.emailCheck(email);
          const { rowCount: check } = data;
          console.log(check);
    
          if (!check) {
            next(new createError(403, "E-mail not registered"));
          }
    
          const {
            rows: [seller],
          } = data;
          const savedPassword = seller.password;
    
          const valid = await compare(password, savedPassword);
    
          if (!valid) {
            return next(createError(403, "E-mail or password incorrect!"));
          }
    
          delete seller.password;
    
          res.json({
            msg: "Login success",
            data: seller,
          });
        } catch (error) {
          console.log(error);
          next(new createError.InternalServerError());
        }
      },
}

module.exports = sellerController;
