const express = require("express");
const router = express.Router();
const { createEvent, getEvents, adminGetEvents,approvePayment,updateApprovePayment } = require("../controllers/eventController")
const { verify, verifyCustomer, verifyAdmin} = require("../_helper/jwt")

router.post("/", verifyCustomer, createEvent);
router.get("/", verify, getEvents);
router.get("/admin", verifyAdmin, adminGetEvents); 
router.get("/admin/approvepayment", approvePayment);
router.post("/admin/update-approvepayment/:id/:status/:remark", updateApprovePayment);

module.exports = router;