const { Router } = require("express");
const {
  getAllPosts,
  getOnePostById,
  createPost,
  deleteAllPosts,
  deletePostById,
  updatePostById,
} = require("../controllers/postController");

const router = Router();

router.get("/", getAllPosts);
router.post("/", createPost);
router.delete("/", deleteAllPosts);

router.get("/:postId", getOnePostById);
router.patch("/:postId", updatePostById);
router.delete("/:postId", deletePostById);

module.exports = router;
