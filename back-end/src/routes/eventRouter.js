const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const { createEvent, getEvents, adminGetEvents, approveEventFromWait, pendEventFromReject, rejectEvent } = require("../controllers/eventController")
=======
const { createEvent, getEventApprove, adminGetEvents, getCategorieAndEvent } = require("../controllers/eventController")
>>>>>>> develop
const { verify, verifyCustomer, verifyAdmin} = require("../_helper/jwt")

router.post("/", verifyCustomer, createEvent);
router.get("/categorie/:categorieId", getCategorieAndEvent);
router.get("/statusapprove", verify, getEventApprove);
router.get("/admin", verifyAdmin, adminGetEvents);
router.put("/approveWait", verifyAdmin, approveEventFromWait);
router.put("/pendReject", verifyAdmin, pendEventFromReject);
router.put("/reject", verifyAdmin, rejectEvent);

module.exports = router;
