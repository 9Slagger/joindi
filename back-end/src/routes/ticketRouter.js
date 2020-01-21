const express = require("express");
const router = express.Router();
const { approvePayment,updateApprovePayment } = require("../controllers/ticketController")

router.get("/admin/approvepayment", approvePayment);
router.post("/admin/update-approvepayment/:id/:status/:remark", updateApprovePayment);

module.exports = router;