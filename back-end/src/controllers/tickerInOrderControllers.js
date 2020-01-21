const db = require("../models");
const _ = require("lodash");
const { Op } = require("sequelize");

module.exports = {
  getTicketInOrder: async (req, res, next) => {
    try {
        let resultModel = await db.TicketInOrderModel.findAll({ 
          include: [{// Notice `include` takes an ARRAY
            model: db.TicketModel
          }]
        })
        res.status(200).send(resultModel)
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
  },
  ApproveTicketInOrder: async (req, res, next) => {
    try {
        let resultModel = db.TicketInOrderModel
        .update(
          {
            ticket_in_order_status_id: req.params.status,
            ticket_remark_reject: req.params.remark
          },
          { where: { id: req.params.id } }
        )
        res.status(200).send(resultModel)
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
  }
};
