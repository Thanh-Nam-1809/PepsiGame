var express = require("express");
var router = express.Router();

const coinController = require("../src/component/coin/controller");

const upload = require("../src/middle/upload");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const data = await coinController.getCoins();
  res.render("coin", { coins: data });
});

router.get("/addCoin", async function (req, res, next) {
  res.render("coinInsert");
});

router.post("/", [upload.single("image")], async function (req, res, next) {
  let { body, file } = req;
  let image = "";
  if (file) {
    image = `http://192.168.12.134:3000/images/${file.filename}`;
  }
  body = { ...body, image };

  await coinController.insert(body);

  res.redirect("/coin");
});

router.get("/:id/edit", async function (req, res, next) {
  const { id } = req.params;
  const coins = await coinController.getCoinById(id);

  res.render("coinEdit", { coins: coins });
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

    await coinController.update(params.id, body);
    res.redirect("/coin");
  }
);

router.delete("/:id/delete", async function (req, res, next) {
  const { id } = req.params;
  await coinController.delete(id);

  res.json({ result: true });
});

module.exports = router;
