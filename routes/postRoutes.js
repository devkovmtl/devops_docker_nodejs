const { Router } = require("express");
const postController = require("../controllers/postController");
const protect = require("../middelwares/auth");

const router = Router();

router
  .route("/")
  .get(postController.getAllPosts)
  .post(protect, postController.createPost)
  .delete(protect, postController.deleteAllPost);

router
  .route("/:postId")
  .get(postController.getOnePostById)
  .patch(protect, postController.updatePostById)
  .delete(protect, postController.deletePostById);

module.exports = router;
