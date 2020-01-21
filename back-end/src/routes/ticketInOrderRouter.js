const express = require("express");
const router = express.Router();
const {
  findAll,
  create,
  update,
  del
} = require("../controllers/ticketInOrderController");
const { verifyCustomer } = require("../_helper/jwt");

router.get("/", verifyCustomer, findAll);
router.post("/", verifyCustomer, create);
router.put("/:id", update);
router.delete("/:id", del);

module.exports = router;
