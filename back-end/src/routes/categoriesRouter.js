const express = require("express");
const router = express.Router();
const { getCategories } = require("../controllers/categorieController");

router.get("/", getCategories);

module.exports = router;
