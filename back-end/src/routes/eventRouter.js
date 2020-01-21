const express = require("express");
const router = express.Router();
const { createEvent, getEvents, adminGetEvents, approveEventFromWait, pendEventFromReject, rejectEvent } = require("../controllers/eventController")
const { verify, verifyCustomer, verifyAdmin} = require("../_helper/jwt")

router.post("/", verifyCustomer, createEvent);
router.get("/", verify, getEvents);
router.get("/admin", verifyAdmin, adminGetEvents);
router.put("/approveWait", verifyAdmin, approveEventFromWait);
router.put("/pendReject", verifyAdmin, pendEventFromReject);
router.put("/reject", verifyAdmin, rejectEvent);

module.exports = router;
