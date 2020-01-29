const db = require("../models");
const _ = require("lodash");

const modelName = "TicketModel";
const arrayOfFields = [
  "ticket_title",
  "ticket_detail",
  "ticket_note",
  "ticket_total_quantity",
  "ticket_remaining_quantity",
  "ticket_price",
  "ticket_manufacturing_date",
  "ticket_expiry_date",
  "event_id"
];

module.exports = {
  findAll: async (req, res, next) => {
    let resultInfo;
    try {
      resultInfo = await db[modelName].findAll();
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
