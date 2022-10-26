const Post = require('../models/Post')

exports.getPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.find({ _id: id })
  
  if (!post) res.status(404).send("No item with that id found");
  
  res.status(200).send(post)
}

exports.getPosts = async (req, res) => {
  const posts = await Post.find({})
  
  res.status(200).send(posts)
}

exports.createPost = async (req, res) => {

  const newPost = {
    content: req.body.content,
    user: req.body.user,
  }

  const createdPost = new Post(newPost);

  const savedPost = await createdPost.save()

  res.status(200).send(`yay ${savedPost._id}`)
}

exports.updatePost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findOneAndUpdate({ _id: id }, 
    { $set: {"content": req.body.content, "user": req.body.user } }, 
    {returnOriginal: false})

  if (!post) res.status(404).send("No post with that id found")

  res.status(200).send(`Successfully updated the following post: \n ${post}`)
}

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findOneAndDelete({ _id: id })

  if (!post) res.status(404).send("No item with that id found")

  res.status(200).send(`Successfully deleted the following item: \n ${post}`)
}