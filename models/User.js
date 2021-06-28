const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    salt: String,
    password: String,
    phone: String,
    membership: {
      validUpto: Date,
      updatedAt: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    roles: {
      type: Array,
      default: ["user"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret, options) {
        delete ret.salt;
        delete ret.password;
      },
    },
  }
);

userSchema.methods.setPassword = function (newPassword) {
  this.salt = crypto.randomBytes(16).toString("hex");

  this.password = crypto
    .pbkdf2Sync(newPassword, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

userSchema.methods.validPassword = function (enteredPassword) {
  var hash = crypto
    .pbkdf2Sync(enteredPassword, this.salt, 1000, 64, "sha512")
    .toString("hex");

  return hash === this.password;
};

module.exports = mongoose.model("User", userSchema);
