var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const userController = require("../src/component/user/controller");
const productController = require("../src/component/product/controller");
const myGiftController = require("../src/component/gift/controller");
const coinController = require("../src/component/coin/controller");

router.post("/user/register", async function (req, res, next) {
  const { username, password, name } = req.body;
  const user = await userController.register(username, password, name);
  user ? res.json({ status: true }) : res.json({ status: false });
});

router.post("/user/login", async function (req, res, next) {
  const { username, password } = req.body;
  const user = await userController.login(username, password);

  if (user) {
    const token = jwt.sign({ id: user._id, username: user.username }, "mykey");
    console.log("token__API_USER", token);
    res.json({ status: true, id: user._id, username: user.username, token });
  } else {
    res.json({ status: false });
  }
});

router.get("/products", async function (req, res, next) {
  const products = await productController.getProducts();
  res.json(products);
});

router.get("/coins", async function (req, res, next) {
  const coins = await coinController.getCoins();
  res.json(coins);
});

module.exports = router;
