const express = require("express")
const router = express.Router();
const { createUser } = require("../controllers/userController");
const { toggleActiveUser } = require("../controllers/userController")
const { getUser } = require("../controllers/userController")


router.post("/", createUser);
router.put("/", toggleActiveUser);
router.get("/", getUser);


module.exports = router;
