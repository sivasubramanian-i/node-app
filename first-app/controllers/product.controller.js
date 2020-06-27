var httpStatus = require("http-status");
var utils = require("../services/utils.service");
var config = require("../config/config");
var _ = require("lodash");
var axios = require("axios");
const ProductController = () => {
  //Get products using third party api and using pagination
  const getProducts = async (req, res) => {
    try {
      const reqObj = utils().getReqValues(req);
      let limit = reqObj.limit ? reqObj.limit : 5;
      let pageNumber = reqObj.pageNumber ? reqObj.pageNumber : 1;
      const headers = {
        "Content-Type": "application/json",
        Authorization: config.secretKey
      };
      axios
        .get(
          config.externalUrl +
            "products/list?limit=" +
            limit +
            "&pageNumber=" +
            pageNumber +
            "",
          {
            headers: headers
          }
        )
        .then(response => {
          return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            msg: "success",
            data:
              response && response.data && response.data.data
                ? response.data.data
                : []
          });
        })
        .catch(error => {
          if (!error.statusCode) {
            error.statusCode = httpStatus.BAD_REQUEST;
          }
          return res
            .status(error.statusCode)
            .json({ status: false, msg: error.message });
        });
    } catch (err) {
      console.log("errr===>", err);
      if (!err.statusCode) {
        err.statusCode = httpStatus.BAD_REQUEST;
      }
      return res.status(err.statusCode).json(err);
    }
  };
  //Get external service call and post to another server
  const getExternalData = async (req, res) => {
    try {
      const reqObj = utils().getReqValues(req);
      const headers = {
        "Content-Type": "application/json",
        Authorization: config.secretKey
      };
      axios
        .get(config.externalUrl + "products/list?pagination=no", {
          headers: headers
        })
        .then(async response => {
          if (response && response.data && response.data.data) {
            let data = response.data.data;
            axios
              .post(config.externalUrl + "products/create", data, {
                headers: headers
              })
              .then(response => {
                return res.status(httpStatus.OK).json({
                  status: httpStatus.OK,
                  data:
                    response && response.data && response.data.data
                      ? response.data.data
                      : [],
                  msg: "Data posted successfully"
                });
              })
              .catch(error => {});
          } else {
            return res.status(httpStatus.BAD_REQUEST).json({
              status: httpStatus.BAD_REQUEST,
              msg: "something went wrong"
            });
          }
        })
        .catch(error => {
          if (!error.statusCode) {
            error.statusCode = httpStatus.BAD_REQUEST;
          }
          return res
            .status(error.statusCode)
            .json({ status: false, msg: error.message });
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
    getExternalData
  };
};

module.exports = ProductController();
