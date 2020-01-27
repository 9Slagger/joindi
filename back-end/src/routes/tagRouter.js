const express = require("express");
const router = express.Router();
const { getTag, addTag } = require("../controllers/tagController");
const { toggleActiveTag } = require("../controllers/tagController");
const {getTagAndEvent} = require("../controllers/tagController")

router.get("/", getTag);
router.get("/tagAndEvent/:tagId", getTagAndEvent)
const { getManageTag } = require("../controllers/tagController.js")

router.get("/manage", getManageTag);
router.put("/", toggleActiveTag);
router.post("/", addTag);

module.exports = router;
