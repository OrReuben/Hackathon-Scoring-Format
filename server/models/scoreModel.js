const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  project: {
    type: String,
    required: true
  },
  contestants: {
    type: String,
    required: true
  },
  totalScore: {
    type: Number,
    required: true,
    default: 0
  },
  totalVotes: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model("Score", ScoreSchema);