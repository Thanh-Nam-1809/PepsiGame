const myGiftService = require("./service");

exports.getMyGiftByUser = async (id_user) => {
  return await myGiftService.getMyGiftByIdUser(id_user);
};

exports.getGift = async () => {
  try {
    let myGift = await myGiftService.getMyGifts();
    myGift = myGift.map((item, index) => {
      item = {
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        hvt: item.hvt,
        phone: item.phone,
        address: item.address,
        note: item.note,
        status: item.status,
        id_user: item.id_user,

        index: index + 1,
      };
      return item;
    });

    return myGift;
  } catch (error) {
    console.log("error " + error);
    return [];
  }
};

exports.getMyGiftById1 = async (id) => {
  try {
    let gift = await myGiftService.getMyGiftById(id);
    console.log("gift " + gift);
    gift = {
      _id: gift._id,
      name: gift.name,
      price: gift.price,
      image: gift.image,
      hvt: gift.hvt,
      phone: gift.phone,
      address: gift.address,
      note: gift.note,
      status: gift.status,
      id_user: gift.id_user,
    };
    return gift;
  } catch (error) {
    console.log("err " + error);
    return {};
  }
};

exports.insert = async (myGift) => {
  return await myGiftService.insert(myGift);
};

exports.update = async (id, myGift) => {
  try {
    await myGiftService.update(id, myGift);
  } catch (error) {
    return null;
  }
};

exports.delete = async (id) => {
  try {
    await myGiftService.delete(id);
  } catch (error) {
    return null;
  }
};
