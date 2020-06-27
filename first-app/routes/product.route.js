var express = require("express");
var router = express.Router();
var productCtrl = require("../controllers/product.controller");

router
  .get("/list", productCtrl.getProducts)
  .get("/externalData", productCtrl.getExternalData);

module.exports = router;
