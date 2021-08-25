const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
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
    default: Date(),
  },
});

module.exports = conversationSchema;
