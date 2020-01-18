const db = require("../models");
const _ = require("lodash");
const { Op } = require("sequelize");

module.exports = {
  createEvent: async (req, res, next) => {
    try {
      req.body.organizedList = req.body.organizedList.map((data, index) => ({
        ...data,
        priority: index + 1
      }));
      // console.log(req.body)
      let resultStatus;
      resultStatus = await db.EventStatusModel.findOne({
        where: { status_code: "01PA" }
      });
      let resultInfo;
      resultInfo = await db.EventModel.create(
        {
          event_name: req.body.event_name,
          event_address: req.body.event_address,
          event_latitude_map: req.body.event_latitude_map,
          event_longitude_map: req.body.event_longitude_map,
          event_date_start: req.body.event_date_start,
          event_date_end: req.body.event_date_end,
          event_content: req.body.event_content,
          user_id: req.user.id,
          event_status_id: resultStatus.id,
          tickets: req.body.ticketsList,
          organized_contacts: req.body.organizedList
        },
        {
          include: [db.TicketModel, db.OrganizedContactModel]
        }
      );

      let event_has_tag_list = [];

      req.body.eventList.map(tag_id => {
        event_has_tag_list.push({
          event_id: resultInfo.id,
          event_tag_id: tag_id
        });
      });

      resultHasTag = await db.EventHasTagModel.bulkCreate(event_has_tag_list);
      res.status(200).send(resultInfo);
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: error.message });
    }
  },
  getEvents: async (req, res, next) => {
    let eventResult;
    try {
      eventResult = await db.EventStatusModel.findAll({
        where: {
          status_code: "02AD"
        },
        include: [
          {
            model: db.EventModel,
            include: [
              { model: db.EventTagModel },
              { model: db.EventCategoryModel }
            ]
          }
        ]
      });
      res.status(200).json({
        result: eventResult,
        messages: {
          title_en: "get events success",
          title_th: ""
        }
      });
    } catch (error) {
      console.log("🔴", error);
      res.status(200).json({
        result: eventResult,
        messages: {
          title_en: "get events fail",
          title_th: ""
        }
      });
      return;
    }
  }
};
