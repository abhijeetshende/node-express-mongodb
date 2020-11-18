const schedule = require("../controllers/schedule.controller.js");
var router = require("express").Router();
// Create a new Tutorial
router.post("/", schedule.create);
// Retrieve all Tutorials
router.get("/", schedule.findAll);
// Retrieve a single Tutorial with id
router.get("/:id", schedule.findOne);
// Update a Tutorial with id
router.put("/:id", schedule.update);
// Delete a Tutorial with id
router.delete("/:id", schedule.delete);
// Create a new Tutorial
router.delete("/", schedule.deleteAll);

module.exports = router;

