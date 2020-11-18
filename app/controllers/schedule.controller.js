const db = require("../models");
const Schedule = db.schedule;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "hostname can not be empty!" });
    return;
  }

  // Create a Tutorial
  const schedule = new Schedule({
    name: req.body.name,
    description: req.body.description,
    types: req.body.types,
    isOneTimeAllDay: req.body.isOneTimeAllDay,
    isRecAllDay: req.body.isRecAllDay,
    startDate: req.body.startDate,
    tillDate: req.body.tillDate,
    repeats: req.body.repeats,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    on_date: req.body.on_date,
    on_month: req.body.on_month,
    dayList: req.body.dayList,
  });

  // Save schedule in the database
  schedule
    .save(schedule)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the schedule.",
      });
    });
};

// Retrieve all Iphost from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

    Schedule.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Schedule.",
      });
    });
};

// Find a single Iphost with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Schedule.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Schedule with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Schedule with id=" + id });
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

  Schedule.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Schedule with id=${id}. Maybe Schedule was not found!`,
        });
      } else res.send({ message: "Schedule was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Schedule with id=" + id,
      });
    });
};

// Delete a Iphost with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Schedule.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Schedule with id=${id}. Maybe Schedule was not found!`,
        });
      } else {
        res.send({
          message: "Schedule was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Schedule with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Schedule.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Schedule were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Schedule.",
      });
    });
};
