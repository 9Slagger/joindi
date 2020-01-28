const express = require("express");
const router = express.Router();
const {
  createUser,
  updateUserDetailIndividual,
  toggleActiveUser,
  getUser,
  getUserDetail
} = require("../controllers/userController");

const { verify, verifyCustomer, verifyAdmin } = require("../_helper/jwt");

router.post("/", createUser);
router.put("/", toggleActiveUser);
router.get("/", getUser);
router.get("/userdetail", verifyCustomer, getUserDetail);
router.put("/edituserprofile", verifyCustomer, updateUserDetailIndividual);
module.exports = router;
