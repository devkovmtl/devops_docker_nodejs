const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: { type: String, require: [true, "Post must have a title"] },
    author: String,
    body: { type: String, require: [true, "Post must have a body"] },
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
