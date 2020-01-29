const db = require("../models");
const _ = require("lodash");
const { Op } = require("sequelize");

module.exports = {
  getJoinEvents: async (req, res, next) => {
    let joinEventResult;
    try {
      joinEventResult = await db.OrderModel.findAll({
        where: {
          user_id: req.user.id
        },
        include: [
          {
            model: db.TicketInOrderModel,
            // where:{ ticket_in_order_staus_id: "4"},
            include: [
              { model: db.TicketInOrderStatusModel },
              { model: db.TicketModel, include: [{ model: db.EventModel }] }
            ]
          }
        ]
      });
      res.status(200).json({
        result: joinEventResult,
        messages: {
          title_en: "get join event success",
          title_th: ""
        }
      });
    } catch (error) {
      console.log("🔴", error);
      res.status(200).json({
        result: joinEventResult,
        messages: {
          title_en: "get join event fail",
          title_th: ""
        }
      });
    }
  }
};
