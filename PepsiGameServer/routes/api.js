var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const userController = require("../src/component/user/controller");
const productController = require("../src/component/product/controller");
const myGiftController = require("../src/component/gift/controller");
const coinController = require("../src/component/coin/controller");
const maQRController = require("../src/component/maQR/controller");

router.post("/user/register", async function (req, res, next) {
  const nodemailer = require("nodemailer");
  const { username, password, name } = req.body;

  //
  const code_otp = Math.floor(Math.random(9999) * 9999);
  let transporter = nodemailer.createTransport({
    // email người gửi
    service: "gmail",
    auth: {
      user: "top59477@gmail.com",
      pass: "nnxbbrtbsnidizci",
    },
  });

  let info = transporter.sendMail({
    from: "top59477@gmail.com",
    to: username,
    subject: "Mã của bạn",
    text: code_otp + "",
  });
  //
  const user = await userController.register(username, password, name);
  user ? res.json({ status: true }) : res.json({ status: false });
});

router.post("/user/login", async function (req, res, next) {
  const { username, password } = req.body;
  const user = await userController.login(username, password);

  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        coin: user.coin,
        numberExchange: user.numberExchange,
        numberFree: user.numberFree,
      },
      "mykey"
    );
    console.log("token__API_USER", token);
    res.json({
      status: true,
      id: user._id,
      username: user.username,
      coin: user.coin,
      numberExchange: user.numberExchange,
      numberFree: user.numberFree,
      token,
    });
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

router.post("/user/update_coin", async (req, res, next) => {
  const { id, coin } = req.body;
  const update = await userController.updateCoin(id, coin);
});

router.post("/user/updateNumberExchange", async (req, res, next) => {
  const { id, numberExchange } = req.body;
  const update = await userController.updatePlay(id, numberExchange);
});

router.post("/user/updateNumberFree", async (req, res, next) => {
  const { id, numberFree } = req.body;
  const update = await userController.updateFreePlay(id, numberFree);
});

router.post("/insertGift", async (req, res, next) => {
  const { name, price, image, hvt, phone, address, note, id_user } = req.body;
  const result = await myGiftController.insert({
    name,
    price,
    image,
    hvt,
    phone,
    address,
    note,
    id_user,
  });
  if (result) {
    return res.status(200).json({ status: 200, error: false });
  }
  res.status(200).json({ status: 200, error: true });
});

router.post("/getAllGiftById", async (req, res, next) => {
  const { id_user } = req.body;
  const myGift = await myGiftController.getMyGiftByUser(id_user);
  if (myGift != null) {
    res.status(200).json({ status: 200, error: false, data: myGift });
  } else {
    res.status(200).json({ status: 200, error: false, data: [] });
  }
});

router.get("/maQR", async function (req, res, next) {
  const maQR = await maQRController.getMaQR();
  res.json(maQR);
});

router.post("/abc", async function (req, res, next) {
  const nodemailer = require("nodemailer");

  //
  const code_otp = Math.floor(Math.random(9999) * 9999);
  let transporter = nodemailer.createTransport({
    // email người gửi
    service: "gmail",
    auth: {
      user: "top59477@gmail.com",
      pass: "nnxbbrtbsnidizci",
    },
  });

  let info = transporter.sendMail({
    from: "Hội con gà",
    to: "domanhthang06082002@gmail.com",
    subject: "Mã của bạn",
    text: "Thắng con gà, Chào mừng bạn gia nhập vào hội gà của chúng tôi",
  });
  //
});

module.exports = router;
