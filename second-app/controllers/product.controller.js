var httpStatus = require("http-status");
var utils = require("../services/utils.service");
var products = require("../config/products.json");
var _ = require("lodash");
const ProductController = () => {
  //Return products
  const getProducts = async (req, res) => {
    try {
      const { limit, pageNumber, pagination } = req.query;
      var productArray = products.products ? products.products : [];
      let productData = utils().paginate(productArray, limit, pageNumber);
      if (pagination == "no") {
        productData = productArray;
      }
      return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        msg: "success",
        data: productData
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = httpStatus.BAD_REQUEST;
      }
      return res.status(err.statusCode).json(err);
    }
  };
  //Received the request from another server and return the response
  const create = async (req, res) => {
    try {
      const reqObj = utils().getReqValues(req);
      //here you received the data and save it.
      return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        data: reqObj,
        msg: "success"
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = httpStatus.BAD_REQUEST;
      }
      return res.status(err.statusCode).json(err);
    }
  };
  return {
    getProducts,
    create
  };
};

module.exports = ProductController();
