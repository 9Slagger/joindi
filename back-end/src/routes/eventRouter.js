const express = require("express");
const router = express.Router();
const { createEvent, getEventApprove, adminGetEvents, getCategorieAndEvent } = require("../controllers/eventController")
const { verify, verifyCustomer, verifyAdmin} = require("../_helper/jwt")

router.post("/", verifyCustomer, createEvent);
router.get("/categorie/:categorieId", getCategorieAndEvent);
router.get("/statusapprove", verify, getEventApprove);
router.get("/admin", verifyAdmin, adminGetEvents);

module.exports = router;
