var httpStatus = require("http-status");
var _ = require("lodash");
var employeeModel = require("../models/employee.model");

const EmployeeController = () => {
  //Get the employee second highest salary using mongodb
  const getEmployees = async (req, res) => {
    try {
      let employeeData = await employeeModel.aggregate([
        { $sort: { name: 1, salary: -1 } },
        { $match: { designation: "developer" } },
        {
          $group: {
            _id: "$designation",
            all_salary: { $push: "$salary" }
          }
        },
        {
          $project: {
            name: 1,
            age: 1,
            designation: 1,
            salary: 1,
            second_max_salary: { $arrayElemAt: ["$all_salary", 1] }
          }
        }
      ]);
      return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        msg: "success",
        data: employeeData
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = httpStatus.BAD_REQUEST;
      }
      return res.status(err.statusCode).json(err);
    }
  };
  return {
    getEmployees
  };
};

module.exports = EmployeeController();
