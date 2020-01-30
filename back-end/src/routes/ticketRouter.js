const express = require("express");
const router = express.Router();
const {
  findAll,
  create,
  update,
  del
} = require("../controllers/ticketController");

router.get("/", findAll);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", del);

const {
  getTicketInOrder,
  ApproveTicketInOrder,
  UpdateTicketQuantity
} = require("../controllers/ticketInOrderControllers");

router.get("/admin/ticketinorder", getTicketInOrder);
router.post(
  "/admin/addticketinorder/:id/:status/:remark",
  ApproveTicketInOrder
);
router.post(
  "/admin/updateticket/:ticketid/:stock",
  UpdateTicketQuantity
);

module.exports = router;
