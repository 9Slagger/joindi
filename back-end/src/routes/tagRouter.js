const express = require("express");
const router = express.Router();
const { getTag } = require("../controllers/tagController")

router.get("/", getTag);

module.exports = router;
