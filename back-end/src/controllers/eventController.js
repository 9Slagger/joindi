const db = require("../models");
const _ = require("lodash");

module.exports = {
  createEvent: async (req, res, next) => {
    // console.log(req.body)
    let resultStatus;
    try {
      resultStatus = await db.EventStatusModel.findOne({
        where: { status_code: "W01" }
      });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
    let resultInfo;
    try {
      console.log(req.body.organizedList);
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

      req.body.eventList.map(tag => {
        event_has_tag_list.push({
          event_id: resultInfo.id,
          event_tag_id: tag.event_tag_id
        });
      });

      resultHasTag = await db.EventHasTagModel.bulkCreate(event_has_tag_list);
      res.status(200).send(resultInfo);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
};
