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

      resultInfo = JSON.parse(JSON.stringify(resultInfo));
      let eventHasImageResult;
      try {
        eventHasImageResult = await db.EventHasImageModel.create({
          image_id: req.body.imageId,
          event_id: resultInfo.id
        });
      } catch (error) {
        return res.status(400).send({ message: error.message });
      }
      resultInfo.event_has_image = eventHasImageResult;

      resultHasTag = await db.EventHasTagModel.bulkCreate(event_has_tag_list);
      res.status(200).send(resultInfo);
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: error.message });
    }
  },
  getEventDetail: async (req, res, next) => {
    let eventDetailResult, eventStatusResult, bookmarkResult;
    try {
      eventStatusResult = await db.EventStatusModel.findOne({
        where: { status_code: "02AD" },
        raw: true
      });
    } catch (error) {
      console.log("🔴", error);
    }
    // console.log("eventStatusResult🟢", eventStatusResult);
    try {
      eventDetailResult = await db.EventModel.findOne({
        where: { id: req.params.eventId },
        include: [
          {
            model: db.EventStatusModel,
            where: { id: eventStatusResult.id }
          },
          { model: db.TicketModel },
          { model: db.EventCategoryModel },
          { model: db.EventTagModel },
          {
            model: db.BookmarkModel,
            where: { event_id: req.params.eventId }
          },
          { model: db.OrganizedContactModel },
          {
            model: db.EventHasImageModel,
            include: [
              {
                model: db.ImageModel
              }
            ]
          }
        ]
      });
      eventDetailResult = JSON.parse(JSON.stringify(eventDetailResult));
      eventDetailResult.bookmarks = !!eventDetailResult.bookmarks.filter(
        bookmark => bookmark.user_id === req.user.id
      ).length;
      // console.log("eventDetailResult🟢", eventDetailResult);
      res.status(200).json({
        result: eventDetailResult,
        messages: { title_en: "get event detail success", title_th: "" }
      });
    } catch (error) {
      console.log("🔴", error);
      res.status(400).json({
        result: eventDetailResult,
        messages: { title_en: "get event detail fail", title_th: "" }
      });
    }
  },
  getEventApprove: async (req, res, next) => {
    let eventResult, bookmarkResult;
    try {
      eventResult = await db.EventStatusModel.findOne({
        where: {
          status_code: "02AD"
        },
        include: [
          {
            model: db.EventModel,
            include: [
              { model: db.EventTagModel },
              { model: db.EventCategoryModel },
              { model: db.TicketModel }
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
    }
  },
  adminGetEvents: async (req, res, next) => {
    let eventResult;
    try {
      eventResult = await db.EventModel.findAll({
        include: [
          { model: db.EventStatusModel },
          { model: db.EventTagModel },
          { model: db.EventCategoryModel },
          { model: db.OrganizedContactModel },
          { model: db.TicketModel }
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
    }
  },
  approveEventFromWait: async (req, res, next) => {
    let eventTarget, eventStatusApproveResult, eventStatusPendingApproveResult;
    try {
      eventStatusApproveResult = await db.EventStatusModel.findOne({
        where: { status_code: "02AD" }
      });
    } catch (error) {
      console.log("🔴", error);
      return res.status(400).json({
        messages: {
          title_en: "approve event fail 1",
          title_th: ""
        }
      });
    }
    try {
      eventStatusPendingApproveResult = await db.EventStatusModel.findOne({
        where: { status_code: "01PA" }
      });
    } catch (error) {
      console.log("🔴", error);
      return res.status(400).json({
        messages: {
          title_en: "approve event fail | Type status pending",
          title_th: ""
        }
      });
    }
    try {
      console.log("id", req.body.eventId);
      eventTarget = await db.EventModel.findOne({
        where: {
          id: req.body.eventId,
          event_status_id: eventStatusPendingApproveResult.id
        }
      });
      await eventTarget.update({
        event_status_id: eventStatusApproveResult.id
      });
      res.status(200).json({
        messages: {
          title_en: "approve event success",
          title_th: ""
        }
      });
    } catch (error) {
      console.log("error", error);
      res.status(200).json({
        messages: {
          title_en: "approve event fail 3",
          title_th: ""
        }
      });
    }
  },
  pendEventFromReject: async (req, res, next) => {
    let eventTarget, eventStatusApproveResult, eventStatusPendingApproveResult;
    try {
      eventStatusApproveResult = await db.EventStatusModel.findOne({
        where: { status_code: "01PA" }
      });
    } catch (error) {
      console.log("🔴", error);
      return res.status(400).json({
        messages: {
          title_en: "pending event fail 1",
          title_th: ""
        }
      });
    }
    try {
      eventStatusPendingApproveResult = await db.EventStatusModel.findOne({
        where: { status_code: "03RJ" }
      });
    } catch (error) {
      console.log("🔴", error);
      return res.status(400).json({
        messages: {
          title_en: "pending event fail",
          title_th: ""
        }
      });
    }
    try {
      console.log("id", req.body.eventId);
      eventTarget = await db.EventModel.findOne({
        where: {
          id: req.body.eventId,
          event_status_id: eventStatusPendingApproveResult.id
        }
      });
      await eventTarget.update({
        event_status_id: eventStatusApproveResult.id
      });
      res.status(200).json({
        messages: {
          title_en: "pending event success",
          title_th: ""
        }
      });
    } catch (error) {
      console.log("error", error);
      res.status(200).json({
        messages: {
          title_en: "pending event fail 3",
          title_th: ""
        }
      });
    }
  },
  rejectEvent: async (req, res, next) => {
    let eventTarget, eventStatusRejectResult, eventStatusPendingRejectResult;
    try {
      eventStatusRejectResult = await db.EventStatusModel.findOne({
        where: { status_code: "03RJ" }
      });
    } catch (error) {
      console.log("🔴", error);
      return res.status(400).json({
        messages: {
          title_en: "reject event fail 1",
          title_th: ""
        }
      });
    }
    try {
      eventStatusPendingRejectResult = await db.EventStatusModel.findOne({
        where: { status_code: "01PA" }
      });
    } catch (error) {
      console.log("🔴", error);
      return res.status(400).json({
        messages: {
          title_en: "reject event fail 2",
          title_th: ""
        }
      });
    }
    try {
      // console.log("id", req.body.eventId, "remark", req.body.eventRemark);
      eventTarget = await db.EventModel.findOne({
        where: {
          id: req.body.eventId,
          event_status_id: eventStatusPendingRejectResult.id
        }
      });
      // console.log("req.body.eventId", req.body.eventId);

      // console.log({
      //   id: req.body.eventId,
      //   event_status_id: eventStatusRejectResult.id,
      //   event_remark: req.body.eventRemark,
      //   eventTarget: eventTarget
      // });

      await eventTarget.update({
        event_status_id: eventStatusRejectResult.id,
        event_remark: req.body.eventRemark
      });
      res.status(200).json({
        messages: {
          title_en: "reject event success",
          title_th: ""
        }
      });
    } catch (error) {
      console.log("🔴", error);
      res.status(200).json({
        messages: {
          title_en: "reject event fail 3",
          title_th: ""
        }
      });
    }
  },
  getCategorieAndEvent: async (req, res, next) => {
    let categorieAndEventResult;
    try {
      categorieAndEventResult = await db.EventCategoryModel.findOne({
        where: { id: req.params.categorieId },
        include: [{ model: db.EventModel }]
      });
      return res.status(200).json({
        result: categorieAndEventResult,
        messages: { title_en: "get categorie and event success", title_th: "" }
      });
    } catch (error) {
      return res
        .status(400)
        .json({ messages: { title_en: "someting is wrong", title_th: "" } });
    }
  },
  getEventCatagorieList: async (req, res, next) => {
    let eventCatagorieList, eventStatusResult;
    try {
      eventStatusResult = await db.EventStatusModel.findOne({
        where: { status_code: "02AD" },
        raw: true
      });
      eventCatagorieList = await db.EventCategoryModel.findAll({
        include: [
          {
            model: db.EventModel,
            where: { event_status_id: eventStatusResult.id }
          }
        ]
      });
      res.status(200).json({
        result: eventCatagorieList,
        messages: { title_en: "get event catagories success", title_th: "" }
      });
    } catch (error) {
      res.status(400).json({
        messages: { title_en: "get event catagories fail", title_th: "" }
      });
    }
  },
  updateEvent: async (req, res, next) => {
    let transaction,
      targetEvent,
      targetTicketsList,
      targetOrganizedList,
      targetTagList,
      targetFindEventHasTag,
      commandFindTicketsList,
      commandUpdateTicketsList,
      commandFindOrganizedList,
      commandUpdateOrganizedList,
      commandCreateEventHasTagList,
      commandUpdateTagList,
      commandFindEventHasTag;
    try {
      transaction = await db.sequelize.transaction();
    } catch (error) {
      return res.status(400);
    }
    try {
      targetEvent = await db.EventModel.findOne(
        {
          where: { id: req.params.eventId }
        },
        { transaction }
      );
      await targetEvent.update({ ...req.body }, { transaction });

      commandFindTicketsList = req.body.tickets.map(ticket =>
        db.TicketModel.findOne({ where: { id: ticket.id } }, { transaction })
      );
      targetTicketsList = await Promise.all(commandFindTicketsList);
      commandUpdateTicketsList = targetTicketsList.map(
        (targetTicket, index) => {
          return targetTicket.update(
            { ...req.body.tickets[index] },
            { transaction }
          );
        }
      );
      await Promise.all(commandUpdateTicketsList);

      commandFindOrganizedList = req.body.organizeds.map(organized =>
        db.OrganizedContactModel.findOne(
          { where: { id: organized.id } },
          { transaction }
        )
      );
      targetOrganizedList = await Promise.all(commandFindOrganizedList);
      commandUpdateOrganizedList = targetOrganizedList.map((organized, index) =>
        organized.update({ ...req.body.organizeds[index] }, { transaction })
      );
      await Promise.all(commandUpdateOrganizedList);

      commandFindEventHasTag = req.body.event_tags.map(tag =>
        db.EventHasTagModel.findOne(
          {
            where: {
              event_id: tag.event_has_tag.event_id,
              event_tag_id: tag.event_has_tag.event_tag_id
            }
          },
          { transaction }
        )
      );
      targetFindEventHasTag = await Promise.all(commandFindEventHasTag);
      commandDeleteEventHasTag = targetFindEventHasTag.map(eventHasTag =>
        eventHasTag.destroy()
      );
      await Promise.all(commandDeleteEventHasTag);

      commandCreateEventHasTagList = req.body.event_tags.map(tag =>
        db.EventHasTagModel.create({
          event_id: req.params.eventId,
          event_tag_id: tag.id
        })
      );
      targetTagList = await Promise.all(commandCreateEventHasTagList);

      await transaction.commit();
    } catch (error) {
      console.log(error);
      transaction.rollback();
      return res.status(400);
    }
  }
};
