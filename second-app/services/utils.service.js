var _ = require("lodash");
var config = require("../config/config");

const utilService = () => {
  const getReqValues = req => {
    return _.pickBy(_.extend(req.body, req.params, req.query), _.identity);
  };
  const paginate = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  return {
    getReqValues,
    paginate
  };
};
module.exports = utilService;
