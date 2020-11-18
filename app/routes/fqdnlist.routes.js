const fqdnhost = require("../controllers/fqdnlist.controller.js");
var router = require("express").Router();
// Create a new Tutorial
router.post("/", fqdnhost.create);
// Retrieve all Tutorials
router.get("/", fqdnhost.findAll);
// Retrieve a single Tutorial with id
router.get("/:id", fqdnhost.findOne);
// Update a Tutorial with id
router.put("/:id", fqdnhost.update);
// Delete a Tutorial with id
router.delete("/:id", fqdnhost.delete);
// Create a new Tutorial
router.delete("/", fqdnhost.deleteAll);

module.exports = router;

