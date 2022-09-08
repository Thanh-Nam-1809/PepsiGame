const coinModel = require("./model");

exports.getCoins = async () => {
  return await coinModel.find();
};

exports.getCoinById = async (id) => {
  return coinModel.findById(id);
};

exports.insert = async (product) => {
  const p = new coinModel(product);
  await p.save();
};

exports.update = async (id, product) => {
  await coinModel.findByIdAndUpdate(id, product);
};

exports.delete = async (id) => {
  await coinModel.findByIdAndDelete(id);
};
