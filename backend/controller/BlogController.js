const Blog = require("../models/Blogs");
const User = require("../models/User");

exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = new Blog({
      title,
      content,
      author: req.author,
      location: req.location,
      createdBy: req.userId,
    });
    await blog.save();
    return res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {
     
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ location: req.location || "India" }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
};

exports.getBlogById = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.likeBlog = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.body.userId;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.likes && blog.likes.includes(userId)) {
      return res.status(400).json({ message: "User already liked the blog" });
    }
    blog.likes.push(userId);
    await blog.save();
    return res.status(200).json({ message: "Blog liked", likes: blog.likes.length });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.addComment = async (req, res) => {
  const blogId = req.params.id;
  const { user, text } = req.body;
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const comment = { user, text };
    blog.comments.push(comment);
    await blog.save();
    return res.status(201).json({ message: "Comment added" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.getComments = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog || blog.comments.length === 0) {
      return res.status(200).json({ message: "No comments" });
    }
    const blogComments = blog.comments;
    const users = await Promise.all(blogComments.map(comment => User.findById(comment.user)));
    const blogCommentsWithUserName = blogComments.map((comment, index) => ({
      ...comment,
      name: users[index] ? users[index].name : "Unknown User",
    }));
    return res.status(200).json(blogCommentsWithUserName);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
