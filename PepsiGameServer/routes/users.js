var express = require("express");
var router = express.Router();

const userController = require("../src/component/user/controller");

const upload = require("../src/middle/upload");

router.get("/", async function (req, res, next) {
  const user = await userController.getUser();

  res.render("user", { users: user });
});

router.get("/add", [], async function (req, res, next) {
  res.render("userInsert");
});

router.post("/", async function (req, res, next) {
  const { username, password, name } = req.body;
  const user = await userController.register(username, password, name);
  if (admin) {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        name: user.name,
      },
      "mykey"
    );
    req.session.token = token;
    res.redirect("/");
  } else {
    res.redirect("/add");
  }
});

router.delete("/:id/delete", async function (req, res, next) {
  const { id } = req.params;
  await userController.delete(id);
  console.log(id);
  res.json({
    result: true,
  });
});

module.exports = router;
