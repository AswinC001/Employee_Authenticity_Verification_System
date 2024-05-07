const mongoose = require("mongoose");

const InstitutionSchema = new mongoose.Schema({
  name: String,
  aicteid:String,
  email: String,
  password: String,
  uniqueId: String
});

module.exports = mongoose.model("Institution", InstitutionSchema);
