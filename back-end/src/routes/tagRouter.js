const express = require("express");
const router = express.Router();
const { getTag, addTag } = require("../controllers/tagController");
const { toggleActiveTag } = require("../controllers/tagController");
<<<<<<< HEAD
const {getTagAndEvent} = require("../controllers/tagController")

router.get("/", getTag);
router.get("/tagAndEvent/:tagId", getTagAndEvent)
=======
const { getManageTag } = require("../controllers/tagController.js")

router.get("/", getTag);
router.get("/manage", getManageTag);
>>>>>>> 09ddcd41d1f05d5fd99d1b2beed1389be02f4f01
router.put("/", toggleActiveTag);
router.post("/", addTag);

module.exports = router;
