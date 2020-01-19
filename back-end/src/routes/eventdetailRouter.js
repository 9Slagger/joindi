const express = require("express");
const router = express.Router();
const { eventDetail } = require("../controllers/eventDetail");

router.get("/", eventDetail);

module.exports = router;
