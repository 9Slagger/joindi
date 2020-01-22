const express = require("express")
const router = express.Router();
const { createUser } = require("../controllers/userController");
const { toggleActiveUser } = require("../controllers/userController")


router.post("/", createUser);
router.put("/", toggleActiveUser);


module.exports = router;
