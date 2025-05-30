const mongoose = require("mongoose");

const FarmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
});

module.exports = mongoose.model("Farm", FarmSchema);
