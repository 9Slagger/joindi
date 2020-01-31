const express = require("express");
const router = express.Router();
const {
  findAll,
  create,
  update,
  del
} = require("../controllers/imageController");
const { verifyCustomer } = require("../_helper/jwt");
const { createImage } = require("../controllers/imagleControllers");

router.post("/safe", verifyCustomer, createImage);
router.get("/", findAll);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", del);

module.exports = router;
