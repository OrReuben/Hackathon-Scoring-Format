const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
    unique:true
  },
  contestants: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Project", ProjectSchema);