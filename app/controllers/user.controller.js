const db = require("../models");
const user = db.user;
const group = db.group;
const task = db.task;
exports.create = (req, res) => {

  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const user_data = {
    user_name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone ,
    address: req.body.address
  };
  user.create(user_data).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  });
};

exports.findAll = (req, res) => {
  user.findAll({
    include: [
      {
        model: group,
        as: "group",
        attributes: ["id", "group_name", "group_description"],
        through: {
          attributes: [],
        }
      },"task"
    ],
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving user."
    });
  });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  user.findByPk(id,{
    include: [
      {
        model: group,
        as: "group",
        attributes: ["id", "group_name", "group_description"],
        through: {
          attributes: [],
        }
      },"task"
    ],
  }).then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find User with id=${id}.`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error retrieving User with id=" + id
    });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const user_data = {
    user_name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone ,
    address: req.body.address
  };

  user.update(user_data, {
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "User was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating User with id=" + id
    });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  user.destroy({
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "User was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Could not delete User with id=" + id
    });
  });
};
exports.addGroup = (req, res) => {
  var user_id = req.body.user_id
  var group_id = req.body.group_id
  console.log(user_id)
  console.log(group_id)

  user.findByPk(user_id).then((user) => {
    if (!user) {
      res.status(404).send({
        message: `Cannot find User with id=${user_id}.`
      });
    }
      group.findByPk(group_id).then((group) => {
      if (!group) {
        res.status(404).send({
          message: `Cannot find Group with id=${group_id}.`
        });
      }
      user.addGroup(group);
      res.send({
        message:"SUCCESS",
        group:group,
        user:user,
      });
    });
  }).catch((err) => {
    console.log(">> Error while adding Group to User: ", err);
    res.status(500).send({
      message: err
    });
  });
};