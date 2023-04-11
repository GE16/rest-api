const express = require('express')
const user = require("../controllers/user.controller.js");
const router = express.Router()
router.post("/", user.create);

router.get("/", user.findAll);

router.get("/:id", user.findOne);

router.put("/:id", user.update);

router.delete("/:id", user.delete);

router.post("/addgroup", user.addGroup);

module.exports = router