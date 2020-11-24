const db = require("../models");
const IphostGroup = db.iphostsgroup;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ code: "IPHOST" });
    return;
  }

  // Create a Tutorial
  const iphost = new IphostGroup({
    name: req.body.name,
    version: req.body.version,
    description: req.body.description,
    type: req.body.type,
    ip_hosts: req.body.ip_address,
  
  });

  // Save Iphost in the database
  iphost
    .save(iphost)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the IphostGroup.",
      });
    });
};

// Retrieve all IphoIphostGroupst from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

    IphostGroup.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving IphostGroup.",
      });
    });
};

// Find a single Iphost with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  IphostGroup.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found IphostGroup with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving IphostGroup with id=" + id });
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

  IphostGroup.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update IphostGroup with id=${id}. Maybe IphostGroup was not found!`,
        });
      } else res.send({ message: "IphostGroup was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating IphostGroup with id=" + id,
      });
    });
};

// Delete a Iphost with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  IphostGroup.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete IphostGroup with id=${id}. Maybe IphostGroup was not found!`,
        });
      } else {
        res.send({
          message: "IphostGroup was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete IphostGroup with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  IphostGroup.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} IphostGroup were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all IphostGroup.",
      });
    });
};
