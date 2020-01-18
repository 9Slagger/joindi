const express = require("express");
const router = express.Router();
const { createEvent, getEvents } = require("../controllers/eventController")
const { verify, verifyCustomer} = require("../_helper/jwt")

router.post("/", verifyCustomer, createEvent);
router.get("/", verify, getEvents);

module.exports = router;
