const db = require("../models");
const Iphost = db.iphosts;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "name can not be empty!" });
    return;
  }

  // Create a Tutorial
  const iphost = new Iphost({
    name: req.body.name,
    version: req.body.version,
    type: req.body.type,
    ip_address: req.body.ip_address,
    subnet: req.body.subnet,
    start_ip_address: req.body.start_ip_address,
    end_ip_address: req.body.end_ip_address,
    ip_address_List: req.body.ip_address_List,
    ip_host_group: req.body.ip_host_group,
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
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

// Retrieve all Iphost from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Iphost.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Iphost.",
      });
    });
};

// Find a single Iphost with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Iphost.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Iphost with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Iphost with id=" + id });
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

  Iphost.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Iphost with id=${id}. Maybe Iphost was not found!`,
        });
      } else res.send({ message: "Iphost was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Iphost with id=" + id,
      });
    });
};

// Delete a Iphost with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Iphost.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Iphost with id=${id}. Maybe Iphost was not found!`,
        });
      } else {
        res.send({
          message: "Iphost was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Iphost with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Iphost.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Iphost were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Iphost.",
      });
    });
};
