const maQRModel = require("./model");

exports.getMaQr = async () => {
  return await maQRModel.find();
};

exports.getMaQrById = async (id) => {
  return maQRModel.findById(id);
};

exports.insert = async (maQR) => {
  const p = new maQRModel(maQR);
  await p.save();
};

exports.update = async (id, maQR) => {
  await maQRModel.findByIdAndUpdate(id, maQR);
};

exports.delete = async (id) => {
  await maQRModel.findByIdAndDelete(id);
};
