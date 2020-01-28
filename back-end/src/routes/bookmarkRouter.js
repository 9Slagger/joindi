const express = require("express")
const router = express.Router();
const { createBookmark, getBookmark  } = require("../controllers/bookmarkController.js")
const { verifyCustomer} = require("../_helper/jwt")

router.post("/", verifyCustomer, createBookmark);
router.get("/mybookmark", verifyCustomer, getBookmark);

module.exports = router;