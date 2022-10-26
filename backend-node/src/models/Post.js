const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  content: { type: String, required: true },
  user: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Post = model("Post", postSchema);

module.exports = Post;