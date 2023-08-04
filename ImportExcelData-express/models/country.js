const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: String,
  code: String,
});

mongoose.model("country", countrySchema);
