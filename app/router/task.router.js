const express = require('express');
const router = express.Router();
const task = require("../controllers/task.controller.js");

router.post("/", task.create);

router.get("/", task.findAll);

router.get("/:id", task.findOne);

router.put("/:id", task.update);

router.delete("/:id", task.delete);


module.exports = router