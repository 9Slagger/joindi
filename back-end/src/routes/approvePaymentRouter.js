const express = require("express");
const router = express.Router();
const { approvePayment } = require("../controllers/approvePayment");

router.get("/", approvePayment);

module.exports = router;
