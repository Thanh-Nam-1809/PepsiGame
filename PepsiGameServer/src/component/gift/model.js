const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const myGiftSchema = new Schema({
  id: { type: ObjectId },
  name: { type: String },
  price: { type: Number },
  image: { type: String },
  hvt: { type: String },
  phone: { type: Number },
  address: { type: String },
  note: { type: String },
  status: { type: String, default: "chưa nhận" },
  id_user: { type: Schema.Types.ObjectId, ref: "user", default: null },
});

module.exports = mongoose.model("myGift", myGiftSchema);
