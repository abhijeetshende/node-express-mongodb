const db = require("../models");
const Zone = db.zone;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "hostname can not be empty!" });
    return;
  }

  // Create a Tutorial
  const zone = new Zone({
    name:req.body.name,
    type:req.body.type,
    description:req.body.description,
    https:req.body.https,
    ssh:req.body.ssh,
    captive_portal:req.body.captive_portal,
    radius_sso:req.body.radius_sso,
    dns:req.body.dns,
    ping:req.body.ping,
    web_proxy:req.body.web_proxy,
    ssl_vpn_tunnel:req.body.ssl_vpn_tunnel,
    dynamic_routing:req.body.dynamic_routing,
    snmp:req.body.snmp,
    smtp_relay:req.body.smtp_relay,
  });

  // Save schedule in the database
  zone
    .save(zone)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the zone.",
      });
    });
};

// Retrieve all Iphost from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

    Zone.find(condition)
    .then((data) => {
      
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving zone.",
      });
    });
};

// Find a single Iphost with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Zone.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Zone with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Zone with id=" + id });
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

  Zone.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Zone with id=${id}. Maybe Zone was not found!`,
        });
      } else res.send({ message: "Zone was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Zone with id=" + id,
      });
    });
};

// Delete a Iphost with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Zone.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Zone with id=${id}. Maybe Zone was not found!`,
        });
      } else {
        res.send({
          message: "Zone was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Zone with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Zone.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Zone were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Zone.",
      });
    });
};
