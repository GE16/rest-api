const db = require("../models");
const user = db.user;
const task = db.task;
const group = db.group;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const task_data = {
    task_name: req.body.name,
    deadline: req.body.deadline,
    user_id: req.body.user_id,
    msUserId: req.body.user_id,
  };
  task.create(task_data).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the task."
    });
  });
};

exports.findAll = (req, res) => {
  task.findAll({
    include: ["user"],
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving group."
    });
  });
};
exports.findOne = (req, res) => {
  const id = req.params.id;
  task.findByPk(id,{
    include: ["user"],
  }).then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find task with id=${id}.`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error retrieving task with id=" + id
    });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const task_data = {
    task_name: req.body.name,
    deadline: req.body.deadline,
    user_id: req.body.user_id,
    msUserId: req.body.user_id,
  };

  task.update(task_data, {
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "Task was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update task with id=${id}. Maybe task was not found or req.body is empty!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating task with id=" + id
    });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  task.destroy({
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "Task was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Could not delete Task with id=" + id
    });
  });
};