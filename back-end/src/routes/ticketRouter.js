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

module.exports = router;
