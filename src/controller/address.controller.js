const addressModel = require("../model/address.model");

const createError = require("http-errors");

const addressController = {
  insertAddress: async (req, res, next) => {
    try {
      const { id } = req.decoded;
      const data = {
        id,
        label: req.body.label,
        recipient: req.body.recipient,
        phone: req.body.phone,
        residence: req.body.residence,
        city: req.body.city,
        postcode: req.body.postcode,
      };

      await addressModel.insertAddress(data);

      res.json({
        msg: "Insert Address success",
        data: data,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getAddress: async (req, res, next) => {
    try {
      const { id } = req.decoded;

      const { rows: address } = await addressModel.getAddress(id);

      res.json({
        msg: "Get Address success",
        data: address,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getAddressDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [address],
      } = await addressModel.getAddressDetail(id);

      res.json({
        msg: "Get Address Detail success",
        data: address,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  updateAddress: async (req, res, next) => {
    try {
      const { id } = req.params;
      const date = new Date();

      const data = {
        id,
        label: req.body.label,
        recipient: req.body.recipient,
        phone: req.body.phone,
        residence: req.body.residence,
        city: req.body.city,
        postcode: req.body.postcode,
        date,
      };

      await addressModel.updateAddress(data);

      const {
        rows: [address],
      } = await addressModel.getAddressDetail(id);

      res.json({
        msg: "Update Address success",
        data: address,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  deleteAddress: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [address],
      } = await addressModel.getAddressDetail(id);

      await addressModel.deleteAddress(id);

      res.json({
        msg: "Delete Address success",
        data: address,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = addressController;
