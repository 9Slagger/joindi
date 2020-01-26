const express = require("express");
const router = express.Router();
const {
  createEvent,
  adminGetEvents,
  approveEventFromWait,
  pendEventFromReject,
  rejectEvent,
  getCategorieAndEvent,
  getEventApprove,
  getEventDetail,
  getEventCatagorieList,
  updateEvent
} = require("../controllers/eventController");
const { verify, verifyCustomer, verifyAdmin } = require("../_helper/jwt");

router.post("/", verifyCustomer, createEvent);
router.get("/categorie", getEventCatagorieList);
router.get("/categorie/:categorieId", getCategorieAndEvent);
router.get("/statusapprove", verify, getEventApprove);
router.get("/admin", verifyAdmin, adminGetEvents);
router.put("/approveWait", verifyAdmin, approveEventFromWait);
router.put("/pendReject", verifyAdmin, pendEventFromReject);
router.put("/reject", verifyAdmin, rejectEvent);
router.get("/:eventId", verify, getEventDetail);
router.put("/:eventId", verifyAdmin, updateEvent);

module.exports = router;
