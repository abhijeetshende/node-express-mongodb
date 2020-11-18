const db = require("../models");
const Fqdnhostlist = db.fqdnhostlist;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body. host_name) {
    res.status(400).send({ message: "hostname can not be empty!" });
    return;
  }

  // Create a Tutorial
  const fqdnhostlist = new Fqdnhostlist({
    host_name:req.body.host_name,
    fqdn:req.body.fqdn,
    fqdn_hosts:req.body.fqdn_hosts
  });

  // Save schedule in the database
  fqdnhostlist
    .save(fqdnhostlist)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the fqdnhostlist.",
      });
    });
};

// Retrieve all Iphost from the database.
exports.findAll = (req, res) => {
  const host_name = req.query.host_name;
  var condition = host_name
    ? { name: { $regex: new RegExp(host_name), $options: "i" } }
    : {};

    Fqdnhostlist.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Fqdnhostlist.",
      });
    });
};

// Find a single Iphost with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Fqdnhostlist.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Fqdnhostlist with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving FqdnFqdnhostlisthost with id=" + id });
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

  Fqdnhostlist.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Fqdnhost with id=${id}. Maybe Fqdnhostlist was not found!`,
        });
      } else res.send({ message: "Fqdnhost was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Fqdnhost with id=" + id,
      });
    });
};

// Delete a Iphost with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Fqdnhostlist.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Fqdnhostlist with id=${id}. Maybe Fqdnhostlist was not found!`,
        });
      } else {
        res.send({
          message: "Fqdnhostlist was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Fqdnhostlist with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Fqdnhostlist.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Fqdnhostlist were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Fqdnhostlist.",
      });
    });
};
