const express = require("express");
const router = express.Router();
const { signin } = require("../controllers/authticationControllers");

router.post("/", signin);

module.exports = router;
