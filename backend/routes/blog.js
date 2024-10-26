
const express = require("express");
const { 
  createBlog,
  getBlogs,
  getBlogById,
  likeBlog,
  addComment,
  getComments 
} = require("../controller/BlogController");
const authMiddleware = require("../middleware/Auth");
const detectLocation = require("../middleware/DetectLocation");

const router = express.Router();

router.post('/blogs', authMiddleware, detectLocation, createBlog);
router.get('/blogs', detectLocation, getBlogs);
router.get('/blogs/:id', getBlogById);
router.post('/blogs/:id/likes', likeBlog);
router.post('/blogs/:id/comments', addComment);
router.get('/blogs/:id/comments', getComments);

module.exports = router;
