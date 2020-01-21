const express = require("express");
const router = express.Router();
const { createEvent, getEvents, adminGetEvents } = require("../controllers/eventController")
const { verify, verifyCustomer, verifyAdmin} = require("../_helper/jwt")

router.post("/", verifyCustomer, createEvent);
router.get("/", verify, getEvents);
router.get("/admin", verifyAdmin, adminGetEvents);

module.exports = router;
