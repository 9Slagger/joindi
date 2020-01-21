const express = require("express");
const router = express.Router();
const { createImage } = require("../controllers/imagleControllers")
const { verifyCustomer} = require("../_helper/jwt")

router.post("/", verifyCustomer, createImage);

module.exports = router;
