const express = require("express");
const router = express.Router();
const { getTag } = require("../controllers/tagController");
const { toggleActiveTag } = require("../controllers/tagController");
const {getTagAndEvent} = require("../controllers/tagController")

router.get("/", getTag);
router.get("/tagAndEvent/:tagId", getTagAndEvent)
router.put("/", toggleActiveTag);

module.exports = router;
