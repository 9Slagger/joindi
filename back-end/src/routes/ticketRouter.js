const express = require("express");
const router = express.Router();
const { getTicketInOrder,ApproveTicketInOrder } = require("../controllers/ticketInOrderControllers")
// router.get("/a", getTicketInOrder);
router.get("/admin/ticketinorder", getTicketInOrder);
router.post("/admin/addticketinorder/:id/:status/:remark", ApproveTicketInOrder);

module.exports = router;
