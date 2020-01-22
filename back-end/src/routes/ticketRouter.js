const express = require("express");
const router = express.Router();
const { getTicketInOrder,ApproveTicketInOrder } = require("../controllers/tickerInOrderControllers")

router.get("/admin/getticketinOrder", getTicketInOrder);
router.post("/admin/approveticketinOrder/:id/:status/:remark", ApproveTicketInOrder);

module.exports = router;