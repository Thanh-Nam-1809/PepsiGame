const userService = require("./service");
const bcrypt = require("bcryptjs");

exports.login = async (username, password) => {
  try {
    const user = await userService.login(username);
    if (!user) return null;
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return null;
    }
    return {
      _id: user._id,
      username: user.username,
      name: user.name,
      coin: user.coin,
      numberExchange: user.numberExchange,
      numberFree: user.numberFree,
    };
  } catch (error) {
    return null;
  }
};

exports.register = async (username, password, name) => {
  let user = await userService.login(username);
  if (user) {
    return null;
  }
  const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
  user = await userService.register(username, hash, name);
  return { _id: user.id };
};

exports.updateCoin = async (id, coin) => {
  try {
    await userService.updateCoin(id, coin);
    return true;
  } catch (error) {
    return false;
  }
};

exports.updatePlay = async (id, numberExchange) => {
  try {
    await userService.updatePlay(id, numberExchange);
    return true;
  } catch (error) {
    return false;
  }
};

exports.updateFreePlay = async (id, numberFree) => {
  try {
    await userService.UpdateFreePlay(id, numberFree);
    return true;
  } catch (error) {
    return false;
  }
};

exports.delete = async (id) => {
  try {
    await userService.delete(id);
  } catch (error) {
    return null;
  }
};

exports.getUser = async () => {
  try {
    let users = await userService.getUsers();
    users = users.map((item, index) => {
      item = {
        _id: item._id,
        username: item.username,
        password: item.password,
        name: item.name,
        coin: item.coin,
        numberExchange: item.numberExchange,
        numberFree: item.numberFree,
        index: index + 1,
      };
      return item;
    });

    return users;
  } catch (error) {
    return [];
  }
};

exports.getUserById = async (id) => {
  try {
    let user = await userService.getUserById(id);
    user = {
      _id: user._id,
      username: user.username,
      password: user.password,
      name: user.name,
      coin: user.coin,
      numberExchange: user.numberExchange,
      numberFree: user.numberFree,
    };
    return user;
  } catch (error) {
    return {};
  }
};
