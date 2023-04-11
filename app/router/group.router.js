const express = require('express');
const router = express.Router();
const group = require("../controllers/group.controller.js");

router.post("/", group.create);

router.get("/", group.findAll);

router.get("/:id", group.findOne);

router.put("/:id", group.update);

router.delete("/:id", group.delete);

router.post("/adduser", group.addUser);

module.exports = router