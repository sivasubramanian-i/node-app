var _ = require("lodash");
var config = require("../config/config");

const utilService = () => {
  const getReqValues = req => {
    return _.pickBy(_.extend(req.body, req.params, req.query), _.identity);
  };

  return {
    getReqValues
  };
};
module.exports = utilService;
