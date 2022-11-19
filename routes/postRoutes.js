const { Router } = require("express");
const postController = require("../controllers/postController");

const router = Router();

router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.createPost)
  .delete(postController.deleteAllPost);

router
  .route("/:postId")
  .get(postController.getOnePostById)
  .patch(postController.updatePostById)
  .delete(postController.deletePostById);

module.exports = router;
