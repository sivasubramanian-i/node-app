var express = require("express");
var router = express.Router();
var productCtrl = require("../controllers/product.controller");

router
  .get("/list", productCtrl.getProducts)
  .post("/create", productCtrl.create);
module.exports = router;
