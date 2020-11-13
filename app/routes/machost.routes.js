const machosts = require("../controllers/machost.controller.js");
var router = require("express").Router();
// Create a new Tutorial
router.post("/", machosts.create);
// Retrieve all Tutorials
router.get("/", machosts.findAll);
// Retrieve a single Tutorial with id
router.get("/:id", machosts.findOne);
// Update a Tutorial with id
router.put("/:id", machosts.update);
// Delete a Tutorial with id
router.delete("/:id", machosts.delete);
// Create a new Tutorial
router.delete("/", machosts.deleteAll);

module.exports = router;

