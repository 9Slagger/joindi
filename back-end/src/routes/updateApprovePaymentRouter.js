const express = require("express");
const router = express.Router();
const { updateApprovePayment } = require("../controllers/updateApprovePayment");

router.post("/:id/:status/:remark", updateApprovePayment);

module.exports = router;
