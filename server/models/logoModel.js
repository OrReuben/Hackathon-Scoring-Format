const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogoModel = new Schema({
  logoUrl: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Logo", LogoModel);
