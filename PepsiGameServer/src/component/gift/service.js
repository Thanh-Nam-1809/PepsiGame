const myGiftModel = require("./model");

exports.getMyGiftByIdUser = async (id_user) => {
  const myGift = await myGiftModel.find({ id_user });
  return myGift;
};

exports.getMyGifts = async () => {
  return await myGiftModel.find();
};

exports.getMyGiftById = async (id) => {
  const gift = await myGiftModel.findOne({ _id: id });
  return gift;
};

exports.insert = async (myGift) => {
  const p = new myGiftModel(myGift);
  return await p.save();
};

exports.update = async (id, myGift) => {
  await myGiftModel.findByIdAndUpdate(id, myGift);
};

exports.delete = async (id) => {
  await myGiftModel.findByIdAndDelete(id);
};
