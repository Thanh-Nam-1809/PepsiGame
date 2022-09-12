const maQRService = require("./service");
const date = require("../../utils/date");

exports.getMaQR = async () => {
  try {
    let maQR = await maQRService.getMaQr();
    maQR = maQR.map((item, index) => {
      item = {
        _id: item._id,
        coin: item.coin,
        image: item.image,

        index: index + 1,
      };
      return item;
    });

    return maQR;
  } catch (error) {
    return [];
  }
};

exports.getMaQRById = async (id) => {
  try {
    let maQR = await maQRService.getMaQrById(id);
    maQR = {
      _id: maQR._id,
      coin: maQR.coin,
      image: maQR.image,
    };
    return maQR;
  } catch (error) {
    return {};
  }
};

exports.insert = async (maQR) => {
  await maQRService.insert(maQR);
};

exports.update = async (id, maQR) => {
  try {
    await maQRService.update(id, maQR);
  } catch (error) {
    return null;
  }
};

exports.delete = async (id) => {
  try {
    await maQRService.delete(id);
  } catch (error) {
    return null;
  }
};
