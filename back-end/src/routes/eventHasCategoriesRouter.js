const express = require("express");
const router = express.Router();
const { createEventHasCategorie } = require("../controllers/eventHasCategoriesControllers");
const { verifyAdmin } = require("../_helper/jwt")

router.post("/", verifyAdmin, createEventHasCategorie);

module.exports = router;
