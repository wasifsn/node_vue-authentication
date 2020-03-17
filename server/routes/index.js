var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/api/register", function(req, res, next) {
  let data = req.body;
  console.log(data);
  res.json(data);
});

router.post("/api/login", function(req, res, next) {
  let data = req.body;
  console.log(data);
  res.json(data);
});

module.exports = router;
