var express = require("express");
var router = express.Router();
var employeeCtrl = require("../controllers/employee.controller");

router.get("/list", employeeCtrl.getEmployees);

module.exports = router;
