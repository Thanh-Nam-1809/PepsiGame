const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const coinSchema = new Schema({
  id: { type: ObjectId },
  name: { type: String },
  coin: { type: Number },
  image: { type: String },
});

module.exports = mongoose.model("coins", coinSchema);
