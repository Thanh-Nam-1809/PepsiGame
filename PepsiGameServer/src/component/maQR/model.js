const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const maQRSchema = new Schema({
  id: { type: ObjectId },
  coin: { type: Number },
  image: { type: String },
});

module.exports = mongoose.model("maQR", maQRSchema);
