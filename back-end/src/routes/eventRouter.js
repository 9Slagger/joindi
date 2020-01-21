const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const { createEvent, getEventApprove, adminGetEvents, getCategorieAndEvent } = require("../controllers/eventController")
const { verify, verifyCustomer, verifyAdmin} = require("../_helper/jwt")

router.post("/", verifyCustomer, createEvent);
router.get("/categorie/:categorieId", getCategorieAndEvent);
router.get("/statusapprove", verify, getEventApprove);
router.get("/admin", verifyAdmin, adminGetEvents);
=======
const { createEvent, getEvents, adminGetEvents} = require("../controllers/eventController")
const { verify, verifyCustomer, verifyAdmin} = require("../_helper/jwt")

router.post("/", verifyCustomer, createEvent);
router.get("/", verify, getEvents);
router.get("/admin", verifyAdmin, adminGetEvents); 
>>>>>>> approve-payment

module.exports = router;