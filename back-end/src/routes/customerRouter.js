const express = require("express");
const router = express.Router();
const { getCustomerType } = require("../controllers/customerTypeControllers");

router.get("/", getCustomerType);

module.exports = router;
