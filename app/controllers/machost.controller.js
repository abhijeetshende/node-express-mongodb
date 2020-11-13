const db = require("../models");
const Machost = db.machosts;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.hostname) {
    res.status(400).send({ message: "hostname can not be empty!" });
    return;
  }

  // Create a Tutorial
  const machost = new Machost({
    "hostname":req.body.hostname,
    "type":req.body.type,
    "macaddress":req.body.macaddress
  });

  // Save Iphost in the database
  machost
    .save(machost)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the mac host.",
      });
    });
};

// Retrieve all Iphost from the database.
exports.findAll = (req, res) => {
  const hostname = req.query.hostname;
  var condition = hostname
    ? { hostname: { $regex: new RegExp(hostname), $options: "i" } }
    : {};

  Machost.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving hostname.",
      });
    });
};

// Find a single Iphost with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Machost.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found hostname with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving hostname with id=" + id });
    });
};

// Update a Iphost by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Machost.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Machost with id=${id}. Maybe Machost was not found!`,
        });
      } else res.send({ message: "Machost was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Machost with id=" + id,
      });
    });
};

// Delete a Iphost with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Machost.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Machost with id=${id}. Maybe Machost was not found!`,
        });
      } else {
        res.send({
          message: "Machost was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Machost with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Machost.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Machost were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Machost.",
      });
    });
};
