const express = require("express");
const router = express.Router();
const { getJoinEvents } = require("../controllers/orderControllers");
const { verify, verifyCustomer, verifyAdmin } = require("../_helper/jwt");

router.get("/joinevent", verifyCustomer, getJoinEvents);

module.exports = router;
