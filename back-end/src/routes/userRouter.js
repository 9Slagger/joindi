const express = require("express");
const router = express.Router();
const {
  createUser,
  updateUserDetailIndividual,
  toggleActiveUser,
  getUser,
  getUserDetail,
  updateUser,
  updateCompanyUser
} = require("../controllers/userController");

const { verify, verifyCustomer, verifyAdmin } = require("../_helper/jwt");

router.post("/", createUser);
router.put("/", toggleActiveUser);
router.get("/", getUser);
router.get("/userdetail", verifyCustomer, getUserDetail);
router.put("/updateuserindividual", verifyCustomer, updateUserDetailIndividual);
router.put("/updateuser", verifyCustomer, updateUser);
router.put("/updatecompanyuser", verifyCustomer, updateCompanyUser);

module.exports = router;
