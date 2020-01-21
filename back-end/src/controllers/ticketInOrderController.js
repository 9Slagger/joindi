const db = require("../models");
const _ = require("lodash");
const sequelize = require("sequelize");

const modelName = "TicketInOrderModel";
const arrayOfFields = [
  "ticket_quantity",
  "ticket_id",
  "ticket_in_order_status_id",
  "order_id"
];

const { QueryTypes } = require("sequelize");

module.exports = {
  findAll: async (req, res, next) => {
    console.log(req.user);
    let resultInfo;
    try {
      // resultInfo = await db[modelName].findAll({
      //   include: [{ model: db.OrderModel }, { model: db.TicketModel }]
      // });
      // resultInfo = await db.OrderModel.findOne({
      //   where: { user_id: req.user.id },
      //   include: [
      //     {
      //       model: db.TicketInOrderModel,
      //       include: [
      //         { model: db.TicketModel },
      //         { model: db.TicketInOrderStatusModel }
      //       ]
      //     }
      //   ]
      // });
      resultInfo = await db.sequelize.query("SELECT * FROM `tickets`");

      console.log(resultInfo);
      res.status(200).send(resultInfo);
    } catch (error) {
      console.error(error.message);
      res.status(400).send({ message: error.message });
    }
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
  }
};
