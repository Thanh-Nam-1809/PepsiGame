var express = require("express");
var router = express.Router();

const giftController = require("../src/component/gift/controller");
const upload = require("../src/middle/upload");

router.get("/", async function (req, res, next) {
  const data = await giftController.getGift();

  res.render("gift", { gifts: data });
});

router.get("/:id/edit", async function (req, res, next) {
  const { id } = req.params;
  console.log("id", id);

  const gifts = await giftController.getMyGiftById1(id);

  res.render("giftEdit", { gifts: gifts });
});

router.post(
  "/:id/edit",
  [upload.single("image")],
  async function (req, res, next) {
    let { body, file, params } = req;
    delete body.image;
    if (file) {
      let image = `http://192.168.12.134:3000/images/${file.filename}`;
      body = { ...body, image };
    }

    await giftController.update(params.id, body);
    res.redirect("/gift");
  }
);

router.delete("/:id/delete", async function (req, res, next) {
  const { id } = req.params;
  await giftController.delete(id);

  res.json({ result: true });
});

module.exports = router;
