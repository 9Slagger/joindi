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
  ApproveTicketInOrder
} = require("../controllers/ticketInOrderControllers");
// router.get("/a", getTicketInOrder);
router.get("/admin/ticketinorder", getTicketInOrder);
router.post(
  "/admin/addticketinorder/:id/:status/:remark",
  ApproveTicketInOrder
);

module.exports = router;
