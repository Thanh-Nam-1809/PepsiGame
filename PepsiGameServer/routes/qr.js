var express = require("express");
var router = express.Router();

const QRCode = require("qrcode");

const maQRController = require("../src/component/maQR/controller");

const upload = require("../src/middle/upload");

router.get("/", async function (req, res, next) {
  const data = await maQRController.getMaQR();
  res.render("maQR", { maQR: data });
});

router.get("/addMaQR", async function (req, res, next) {
  res.render("maQRInsert");
});

router.post("/", [upload.single("image")], async function (req, res, next) {
  let { body } = req;
  body = { ...body };

  await maQRController.insert(body);

  res.redirect("/maQR");
});

router.get("/:id/edit", async function (req, res, next) {
  const { id } = req.params;
  const maQR = await maQRController.getMaQRById(id);

  res.render("maQREdit", { maQR: maQR });
});

router.post("/:id/edit", async function (req, res, next) {
  let { body, params } = req;
  body = { ...body };

  await maQRController.update(params.id, body);
  res.redirect("/maQR");
});

// router.get("/", async (req, res) => {
//   let img = "";
//   let qr = await QRCode.toDataURL("I am hello!");
//   console.log(qr);
//   img = `<image src= " ` + qr + `" />`;
//   return res.send(img);
// });

router.delete("/:id/delete", async function (req, res, next) {
  const { id } = req.params;
  await maQRController.delete(id);

  res.json({ result: true });
});

module.exports = router;
