const router = require("express").Router()
const itemController = require("../controllers/item")

router.get("/", itemController.getItems)
router.get("/single/:id", itemController.getItemById)
router.get("/myitems/:userId", itemController.getItemsMyItems)
router.get("/search/:filter", itemController.getItemsFromSearch)
router.post("/create", itemController.createItem)
router.put("/update/:id", itemController.updateItem)
router.delete("/delete/:id", itemController.deleteItem)
router.get("/latest", itemController.getItemsLatest) 

module.exports = router