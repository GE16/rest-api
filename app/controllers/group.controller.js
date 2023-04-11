const db = require("../models");
const user = db.user;
const group = db.group;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const group_data = {
    group_name: req.body.name,
    group_description: req.body.description,
  };
  group.create(group_data).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Group."
    });
  });
};
exports.findAll = (req, res) => {
  group.findAll({
    include: [
      {
        model: user,
        as: "users",
        attributes: ["id", "user_name", "email", "phone_number","address"],
        through: {
          attributes: [],
        }
      },
    ],
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
  group.findByPk(id,{
    include: [
      {
        model: user,
        as: "users",
        attributes: ["id", "user_name", "email", "phone_number","address"],
        through: {
          attributes: [],
        }
      },
    ],
  }).then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find group with id=${id}.`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error retrieving group with id=" + id
    });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const group_data = {
    group_name: req.body.name,
    group_description: req.body.description,
  };

  group.update(group_data, {
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "Group was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Group with id=${id}. Maybe Group was not found or req.body is empty!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating Group with id=" + id
    });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  group.destroy({
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "Group was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Group with id=${id}. Maybe Group was not found!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Could not delete Group with id=" + id
    });
  });
};

exports.addUser = (req, res) => {
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
      group.addUser(user);
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