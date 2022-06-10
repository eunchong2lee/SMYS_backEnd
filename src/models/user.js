const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  nickname: String,
  password: String,
});
UserSchema.virtual("userId").get(function () {
  return this._id.toHexString();
});
UserSchema.set("toJSON", {
  virtuals: true,
});
UserSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err)
        return next(err);
      bcrypt.hash(user.password, salt, function (err, hashPassword) {
        if (err)
          return next(err);
        user.password = hashPassword;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", UserSchema);