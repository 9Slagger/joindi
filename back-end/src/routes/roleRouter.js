const express = require("express");
const router = express.Router();
const { getRole } = require("../controllers/roleControllers");

router.get("/", getRole);

module.exports = router;
