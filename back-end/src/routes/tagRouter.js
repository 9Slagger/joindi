const express = require("express");
const router = express.Router();
const { getTag, addTag } = require("../controllers/tagController");
const { toggleActiveTag } = require("../controllers/tagController");

router.get("/", getTag);
router.put("/", toggleActiveTag);
router.post("/", addTag);

module.exports = router;
