var express = require("express");
var router = express.Router();

const productController = require("../src/component/product/controller");

const upload = require("../src/middle/upload");

router.get("/", async function (req, res, next) {
  const data = await productController.getProducts();

  res.render("product", { products: data });
});

router.get("/addProduct", [], async function (req, res, next) {
  res.render("productInsert");
});

router.post("/", [upload.single("image")], async function (req, res, next) {
  let { body, file } = req;
  let image = "";
  if (file) {
    image = `http://192.168.12.134:3000/images/${file.filename}`;
  }
  body = { ...body, image };

  await productController.insert(body);

  res.redirect("/product");
});

router.get("/:id/edit", async function (req, res, next) {
  const { id } = req.params;
  const products = await productController.getProductById(id);

  res.render("productEdit", { products: products });
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

    await productController.update(params.id, body);
    res.redirect("/product");
  }
);

router.delete("/:id/delete", async function (req, res, next) {
  const { id } = req.params;
  await productController.delete(id);

  res.json({ result: true });
});

module.exports = router;
