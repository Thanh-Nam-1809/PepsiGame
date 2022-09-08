const coinService = require("./service");

exports.getCoins = async () => {
  try {
    let coins = await coinService.getCoins();
    coins = coins.map((item, index) => {
      item = {
        _id: item._id,
        name: item.name,
        coin: item.coin,
        image: item.image,

        index: index + 1,
      };
      return item;
    });

    return coins;
  } catch (error) {
    return [];
  }
};

exports.getCoinById = async (id) => {
  try {
    let coins = await coinService.getCoinById(id);
    coins = {
      _id: coins._id,
      name: coins.name,
      coin: coins.coin,
      image: coins.image,
    };
    return coins;
  } catch (error) {
    return {};
  }
};

exports.insert = async (coin) => {
  await coinService.insert(coin);
};

exports.update = async (id, coins) => {
  try {
    await coinService.update(id, coins);
  } catch (error) {
    return null;
  }
};

exports.delete = async (id) => {
  try {
    await coinService.delete(id);
  } catch (error) {
    return null;
  }
};
