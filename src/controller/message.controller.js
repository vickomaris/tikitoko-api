const messageModel = require("../model/message.model");

const response = require("../helper/response.helper");
const createError = require("http-errors");

const messageController = {
  getMessage: async (req, res, next) => {
    try {
      const { id: receiver } = req.params;
      const { id: sender } = req.decoded;

      const { rows: messages } = await messageModel.getMessage(
        sender,
        receiver
      );

      response(res, messages, 200, "Get Messages success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = messageController;
