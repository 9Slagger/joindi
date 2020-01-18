const express = require("express");
const router = express.Router();
const { createEvent } = require("../controllers/eventController")
const { getStatusEvent } = require("../controllers/eventController")
const {verifyCustomer} = require("../_helper/jwt")


router.post("/", verifyCustomer, createEvent);
router.get("/getEventStatus", getStatusEvent);

module.exports = router;
