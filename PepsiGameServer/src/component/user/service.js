const userModel = require("./model");

exports.login = async (username) => {
  const user = await userModel.findOne(
    {
      username: username,
    },
    "id username password coin numberPlay numberExchange numberFree"
  );
  console.log("user: ", user);
  return user;
};

exports.register = async (username, password, name) => {
  const user = new userModel({
    username,
    password,
    name,
  });
  console.log(user);
  return await user.save();
};

exports.updateCoin = async (id, coin) => {
  await userModel.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        coin: coin,
      },
    }
  );
};

exports.updatePlay = async (id, numberExchange) => {
  await userModel.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        numberExchange: numberExchange,
      },
    }
  );
};

exports.UpdateFreePlay = async (id, numberFree) => {
  await userModel.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        numberFree: numberFree,
      },
    }
  );
};

exports.delete = async (id) => {
  await userModel.findByIdAndDelete(id);
};

exports.getUsers = async () => {
  return userModel.find(
    {},
    "id username password name coin numberExchange numberFree"
  );
};

exports.getUserByID = async (id) => {
  const user = await userModel.findOne({ _id: id });
  return user;
};
