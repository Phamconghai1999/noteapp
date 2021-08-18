var mongoose = require("mongoose");

var AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: { type: String },
  avatar: { type: String },
});

var Account = mongoose.model("accounts", AccountSchema);
module.exports = Account;
