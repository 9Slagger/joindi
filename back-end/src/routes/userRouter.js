const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/userController");
const { toggleActiveUser } = require("../controllers/userController");
const { getUser } = require("../controllers/userController");
const { getUserDetail } = require("../controllers/userController");
const { verify, verifyCustomer, verifyAdmin } = require("../_helper/jwt");

router.post("/", createUser);
router.put("/", toggleActiveUser);
router.get("/", getUser);
router.get("/userdetail", verifyCustomer, getUserDetail);

module.exports = router;
