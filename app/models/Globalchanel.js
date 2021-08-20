const mongoose = require("mongoose");

const globalChanelSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "accounts",
    required: true,
  },
  sendAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("globalchanels", globalChanelSchema);
