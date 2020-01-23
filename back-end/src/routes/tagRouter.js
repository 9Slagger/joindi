const express = require("express");
const router = express.Router();
const { getTag } = require("../controllers/tagController");
const { toggleActiveTag } = require("../controllers/tagController");

router.get("/", getTag);
router.put("/", toggleActiveTag);

module.exports = router;
