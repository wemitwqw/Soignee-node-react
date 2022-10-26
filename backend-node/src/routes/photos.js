const router = require("express").Router()
const photosController = require("../controllers/photos")

router.get("/:filename", photosController.getImage)

module.exports = router