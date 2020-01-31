const db = require("../models");
const _ = require("lodash");
const { Op } = require("sequelize");

module.exports = {
  createTicketInOrder: async (req, res, next) => {
    let prevTicketInOrderResult,
      ticketInOrderResult,
      OrderResult,
      TicketInOrderStatusResult;
    try {
      OrderResult = await db.OrderModel.findOne({
        where: { user_id: req.user.id },
        raw: true
      });
      TicketInOrderStatusResult = await db.TicketInOrderStatusModel.findOne({
        where: { status_code: "checkout" },
        raw: true
      });
      prevTicketInOrderResult = await db.TicketInOrderModel.findOne({
        where: {
          order_id: OrderResult.id,
          ticket_id: req.params.ticketId,
          ticket_in_order_status_id: TicketInOrderStatusResult.id
        }
      });
      if (!_.isEmpty(prevTicketInOrderResult)) {
        prevTicketInOrderResult.update({
          ticket_quantity:
            parseInt(prevTicketInOrderResult.ticket_quantity, 10) +
            parseInt(req.body.ticketQuantity, 10)
        });
        res.status(201).json({
          result: ticketInOrderResult,
          messages: {
            title_en: "checkout ticket success",
            title_th: ""
          }
        });
      } else {
        ticketInOrderResult = await db.TicketInOrderModel.create({
          ticket_id: req.params.ticketId,
          ticket_in_order_status_id: TicketInOrderStatusResult.id,
          ticket_quantity: req.body.ticketQuantity,
          order_id: OrderResult.id
        });
        res.status(201).json({
          result: ticketInOrderResult,
          messages: {
            title_en: "checkout ticket success",
            title_th: ""
          }
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        messages: {
          title_en: "checkout ticket fail",
          title_th: ""
        }
      });
    }
  },
  getTicketInOrder: async (req, res, next) => {
    try {
      let resultModel = await db.TicketInOrderModel.findAll({
        include: [
        {
          model: db.TicketModel,
        },{
          model: db.TicketInOrderHasImageModel,
          include:{
            model: db.ImageModel
          }
        }
      ]
    });
      res.status(200).send(resultModel);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  ApproveTicketInOrder: async (req, res, next) => {
    try {
      let resultModel = db.TicketInOrderModel.update(
        {
          ticket_in_order_status_id: req.params.status,
          ticket_in_order_remark_reject: req.params.remark
        },
        { where: { id: req.params.id } }
      );
      res.status(200).send(resultModel);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  UpdateTicketQuantity: async (req, res, next) => {
    try {
      let resultModel = db.TicketModel.update(
        {
          ticket_remaining_quantity: req.params.stock
        },
        { where: { id: req.params.ticketid } }
      );
      res.status(200).send(resultModel);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
};
