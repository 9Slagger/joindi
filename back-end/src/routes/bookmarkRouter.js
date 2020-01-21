const express = require("express")
const router = express.Router();
const { createBookmark } = require("../controllers/bookmarkController.js")
const { verifyCustomer} = require("../_helper/jwt")

router.post("/" ,verifyCustomer, createBookmark);

module.exports = router;