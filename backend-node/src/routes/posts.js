const router = require("express").Router()
const postsController = require("../controllers/posts")

router.get("/", postsController.getPosts)
router.get("/:id", postsController.getPost)
router.post("/create", postsController.createPost)
router.put("/update/:id", postsController.updatePost)
router.delete("/delete/:id", postsController.deletePost)

module.exports = router