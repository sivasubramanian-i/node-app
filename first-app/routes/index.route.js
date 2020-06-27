var express = require("express");
var router = express.Router();
var config = require("../config/config");
var _ = require("lodash");
var productRoutes = require("./product.route");
var employeeRoutes = require("./employee.route");

function _validateToken(token) {
  return new Promise(async (resolve, reject) => {
    console.log("_validateToken", token);

    if (token === config.secretKey) {
      resolve({
        status: "true",
        msg: "Successful Authorization!"
      });
    } else {
      reject({ status: "false", msg: "Invalid Token" });
    }
  });
}
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/*router.use((req, res, next) => {
  console.log("req.url", req.url);
  const allowedUrls = [];
  if (
    req.method !== "OPTIONS" &&
    !_.includes(allowedUrls, req.url.split("?")[0])
  ) {
    const token = req.headers["Authorization"] || req.headers["authorization"];
    _validateToken(token).then(
      res => {
        console.log("_validateToken", res);
        next();
      },
      err => {
        res.status(403).send({
          status: "false",
          msg: "Failed to authenticate",
          err
        });
      }
    );
  } else {
    next();
  }
});*/

router.use("/products", productRoutes);
router.use("/employees", employeeRoutes);

// export default router;
module.exports = router;
