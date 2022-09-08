const productModel = require("./model");

exports.getProducts = async () => {
  return await productModel.find();
};

exports.getProductById = async (id) => {
  return productModel.findById(id);
};

exports.insert = async (product) => {
  const p = new productModel(product);
  await p.save();
};

exports.update = async (id, product) => {
  await productModel.findByIdAndUpdate(id, product);
};

exports.delete = async (id) => {
  await productModel.findByIdAndDelete(id);
};
