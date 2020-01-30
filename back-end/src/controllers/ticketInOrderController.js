const db = require("../models");
const _ = require("lodash");
const sequelize = require("sequelize");

const { QueryTypes } = require("sequelize");
const modelName = "TicketInOrderModel";
const arrayOfFields = [
  "ticket_quantity",
  "ticket_in_order_status_id",
  "ticket_id",
  "order_id"
];

module.exports = {
  findAll: async (req, res, next) => {
    let resultInfo;
    try {
      const resultInfo = await db.sequelize.query(
        ` SELECT t.id as "ticket_id", t.ticket_title, t.ticket_detail, t.ticket_total_quantity, t.ticket_remaining_quantity, t.ticket_price,
            tios.id as "ticket_in_order_status_id", tios.status_code, 
            tio.id as "ticket_in_order_id", tio.ticket_quantity,
            e.event_name
          FROM orders o
          INNER JOIN ticket_in_orders tio on o.id = tio.order_id
          INNER JOIN tickets t on t.id = tio.ticket_id
          INNER JOIN ticket_in_order_statuses tios on tios.id = tio.ticket_in_order_status_id
          LEFT JOIN ticket_in_order_has_images tiohi on tiohi.ticket_in_order_id = tio.id
          INNER JOIN events e on e.id = t.event_id
          LEFT JOIN event_has_images ehi on ehi.event_id = e.id
          WHERE o.user_id = $user_id and tios.status_code = $status_code
            and tio.id = $ticket_in_order_id
        `,
        {
          bind: {
            user_id: req.user.id,
            ticket_in_order_id: req.params.ticket_in_order_id,
            status_code: req.params.status
          },
          type: QueryTypes.SELECT
        }
      );

      console.log(resultInfo);
      res.status(200).send(resultInfo);
    } catch (error) {
      console.error(error.message);
      res.status(400).send({ message: error.message });
    }
  },
  findAll2: async (req, res, next) => {
    let ticketInOrderResult, orderResult, ticketInOrderStatusResult;
    try {
      orderResult = await db.OrderModel.findOne({
        where: { user_id: req.user.id },
        raw: true
      });
      ticketInOrderStatusResult = await db.TicketInOrderStatusModel.findOne({
        where: { status_code: "checkout" },
        raw: true
      });
      ticketInOrderResult = await db.TicketInOrderModel.findAll({
        where: {
          order_id: orderResult.id,
          ticket_in_order_status_id: ticketInOrderStatusResult.id
        },
        include: [
          {
            model: db.TicketModel,
            include: [
              {
                model: db.EventModel,
                include: [
                  {
                    model: db.EventHasImageModel,
                    include: [{ model: db.ImageModel }]
                  }
                ]
              }
            ]
          }
        ]
      });
      res.status(200).json({ result: ticketInOrderResult });
    } catch (error) {
      // handle error
    }
    // let resultInfo;
    // try {
    //   const resultInfo = await db.sequelize.query(
    //     ` SELECT t.id as "ticket_id", t.ticket_title, t.ticket_detail, t.ticket_total_quantity, t.ticket_remaining_quantity, t.ticket_price,
    //         tios.id as "ticket_in_order_status_id", tios.status_code,
    //         tio.id as "ticket_in_order_id", tio.ticket_quantity,
    //         e.event_name
    //       FROM orders o
    //       INNER JOIN ticket_in_orders tio on o.id = tio.order_id
    //       left JOIN tickets t on t.id = tio.ticket_id = t.id
    //       left JOIN ticket_in_order_statuses tios on tios.id = tio.ticket_in_order_status_id
    //       LEFT JOIN ticket_in_order_has_images tiohi on tiohi.ticket_in_order_id = tio.id
    //       INNER JOIN events e on e.id = t.event_id

    //       WHERE o.user_id = $user_id and tios.status_code = $status_code
    //     `,
    //     {
    //       bind: {
    //         user_id: req.user.id,
    //         status_code: req.params.status
    //       },
    //       type: QueryTypes.SELECT
    //     }
    //   );
    //   // LEFT JOIN event_has_images ehi on ehi.event_id = e.id

    //   console.log(resultInfo);
    //   res.status(200).send(resultInfo);
    // } catch (error) {
    //   console.error(error.message);
    //   res.status(400).send({ message: error.message });
    // }
  },
  create: async (req, res, next) => {
    let resultInfo,
      obj = {};
    try {
      arrayOfFields.forEach(item => {
        obj[item] = req.body[item];
      });

      resultInfo = await db[modelName].create(obj);
      console.log(resultInfo);
      res.status(200).send(resultInfo);
    } catch (error) {
      console.error(error.message);
      res.status(400).send({ message: error.message });
    }
  },
  update: async (req, res, next) => {
    let resultInfo,
      obj = {};
    try {
      arrayOfFields.forEach(item => {
        obj[item] = req.body[item];
      });

      resultInfo = await db[modelName].update(obj, {
        where: { id: req.params.id }
      });
      console.log(resultInfo);
      res.status(200).send(`${modelName} id: ${req.params.id} updated.`);
    } catch (error) {
      console.error(error.message);
      res.status(400).send({ message: error.message });
    }
  },
  del: async (req, res, next) => {
    let resultInfo;
    try {
      resultInfo = await db[modelName].destroy({
        where: { id: req.params.id }
      });
      console.log(resultInfo);
      res.status(200).send(`${modelName} id: ${req.params.id} deleted.`);
    } catch (error) {
      console.error(error.message);
      res.status(400).send({ message: error.message });
    }
  },
  findAllTicketWithWaitStatus: async (req, res, next) => {
    let resultInfo;
    try {
      const resultInfo = await db.sequelize.query(
        ` SELECT t.id as "ticket_id", t.ticket_title, t.ticket_detail, t.ticket_total_quantity, t.ticket_remaining_quantity, t.ticket_price,
            tios.id as "ticket_in_order_status_id", tios.status_code, 
            tio.id as "ticket_in_order_id", tio.ticket_quantity,
            e.event_name,
            img.id, img.filename_extension
          FROM orders o
          INNER JOIN ticket_in_orders tio on o.id = tio.order_id
          INNER JOIN tickets t on t.id = tio.ticket_id
          INNER JOIN ticket_in_order_statuses tios on tios.id = tio.ticket_in_order_status_id
          LEFT JOIN ticket_in_order_has_images tiohi on tiohi.ticket_in_order_id = tio.id
          INNER JOIN events e on e.id = t.event_id
          LEFT JOIN event_has_images ehi on ehi.event_id = e.id
          LEFT JOIN images img on img.id = ehi.image_id 
          WHERE o.user_id = $user_id and (tios.status_code = "wait_for_payment" OR tios.status_code = "wait_for_approve" or tios.status_code = "complete")
        `,
        {
          bind: {
            user_id: req.user.id
          },
          type: QueryTypes.SELECT
        }
      );

      console.log(resultInfo);
      res.status(200).send(resultInfo);
    } catch (error) {
      console.error(error.message);
      res.status(400).send({ message: error.message });
    }
  }
};
