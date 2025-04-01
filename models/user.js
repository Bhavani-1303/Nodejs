const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["FarmAdmin", "FarmManager", "FarmTechnician", "EndUser"], 
    default: "EndUser" 
  },
});

module.exports = mongoose.model("User", UserSchema);
