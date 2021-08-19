var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var AccountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "Aniuser",
    },
    description: { type: String },
    avatar: { type: String, default: "/img/avatar_default.png" },
  },
  {
    timestamps: true,
  }
);

//authenticate input against database
AccountSchema.statics.authenticate = async function (
  email,
  password,
  callback
) {
  try {
    await Account.findOne({ email: email }).exec(function (err, user) {
      if (err) {
        return callback(err);
      } else if (!user) {
        var err = new Error("User not found.");
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          var err = new Error("Hashing problem.");
          err.status = 401;
          return callback(err);
        }
      });
    });
  } catch (error) {
    res.status(401).send({ success: false, message: error.message });
  }
};
// hash password before save
AccountSchema.pre("save", function (next) {
  var account = this;
  bcrypt.hash(account.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    account.password = hash;
    next();
  });
});

var Account = mongoose.model("accounts", AccountSchema);
module.exports = Account;
