const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  id: { type: ObjectId },
  username: { type: String, requiredPaths: true },
  password: { type: String, requiredPaths: true },
  name: { type: String, requiredPaths: true },
  coin: { type: Number, requiredPaths: true, default: 0 },
  numberExchange: { type: Number, requiredPaths: true, default: 5 },
  numberFree: { type: Number, requiredPaths: true, default: 3 },
});

module.exports = mongoose.model("user", userSchema);
