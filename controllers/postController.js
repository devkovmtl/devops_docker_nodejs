const Post = require("../models/Post");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json({
      success: true,
      msg: "OK",
      data: {
        count: posts.length,
        posts,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "server error", data: null });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
        data: null,
      });
    }
    const post = await Post.create({ title, body });
    return res.status(200).json({
      success: true,
      msg: "OK",
      data: {
        post,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "server error", data: null });
  }
};

exports.deleteAllPost = async (req, res, next) => {
  try {
    await Post.deleteMany();
    return res.status(200).json({
      success: true,
      msg: "OK",
      data: null,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "server error", data: null });
  }
};

exports.getOnePostById = async (req, res, next) => {
  try {
    const postId = req.params;
    const post = await Post.findById(postId);
    return res.status(200).json({
      success: true,
      msg: "OK",
      data: {
        post,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "server error", data: null });
  }
};

exports.updatePostById = async (req, res, next) => {
  try {
    const postId = req.params;
    const post = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      msg: "OK",
      data: {
        post,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "server error", data: null });
  }
};

exports.deletePostById = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    return res.status(200).json({
      success: true,
      msg: "OK",
      data: null,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "server error", data: null });
  }
};
