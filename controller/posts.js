const Post = require('../models/Post');

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      const error = new Error('fetching posts failed');
      error.statusCode = 500;
      throw error;
    }
    res.status(200).json({ msg: 'Posts fetched', posts })
  } catch (err) {
    next(err);
  }
}

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ msg: 'Post fetched', post });
  } catch (err) {
    next(err);
  }
}

exports.addPost = async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const creator = req.body.creator;

  try {
    const post = new Post({ title, content, creator });
    const response = await post.save();
    if (!response) {
      const error = new Error('Creating post failed');
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json({ msg: 'Post Created', post: response });
  } catch (err) {
    next(err);
  }
}

exports.editPost = async (req, res, next) => {
  const postId = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }
    post.title = title;
    post.content = content;
    const updatedPost = await post.save();
    if (!updatedPost) {
      const error = new Error('Post not updated');
      error.statusCode = 500;
      throw error;
    }
    res.status(200).json({ msg: "Post Updated", updatedPost })

  } catch (err) {
    next(err);
  }
}

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ msg: 'Post deleted' });
  } catch (err) {
    next(err);
  }
}