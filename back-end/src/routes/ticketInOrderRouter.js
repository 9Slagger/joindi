const express = require("express");
const router = express.Router();
const {
  findAll,
  create,
  update,
  del,
  findAllTicketWithWaitStatus
} = require("../controllers/ticketInOrderController");
const { verifyCustomer } = require("../_helper/jwt");

router.get("/:status", verifyCustomer, findAll);
router.get("/:status/:ticket_in_order_id", verifyCustomer, findAll);
router.get("/", verifyCustomer, findAllTicketWithWaitStatus);
router.post("/", verifyCustomer, create);
router.put("/:id", update);
router.delete("/:id", del);

module.exports = router;
