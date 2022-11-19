const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, require: [true, "Username is required"] },
    password: {
      type: String,
      require: [true, "Password is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    hidden: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
