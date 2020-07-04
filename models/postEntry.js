const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requireString = {
  type: String,
  required: true,
};

const postEntrySchema = new Schema(
  {
    title: requireString, // String is shorthand for {type: String}
    body: requireString,
    summary: requireString,
    comments: String,
    created_at: { type: Date, default: Date.now },
    image: String,
  },
  {
    timestamps: true,
  }
);

const postEntry = mongoose.model("postEntry", postEntrySchema);

module.exports = postEntry;
