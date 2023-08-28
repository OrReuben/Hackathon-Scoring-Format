const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParamSchema = new Schema({
  param: {
    type: String,
    required: true,
    unique: true,
  },
  maxParamValue: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Param", ParamSchema);
