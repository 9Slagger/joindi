const db = require("../models");
const _ = require("lodash");

module.exports = {
  getTag: async (req, res, next) => {
    try {
      const resultTag = await db.EventTagModel.findAll({
        where: { tag_active: true },
      });
      res.status(200).json({
        result: resultTag,
        messages: {
          title_en: "get tags success",
          title_th: ""
        }
      });
    } catch (error) {
      res.status(400).json({
        messages: {
          title_en: "get tags fail",
          title_th: ""
        }
      });
    }
  },
  getManageTag: async (req, res, next) => {
    try {
      const resultTag = await db.EventTagModel.findAll({});
      res.status(200).json({
        result: resultTag,
        messages: {
          title_en: "get tags success",
          title_th: ""
        }
      });
    } catch (error) {
      res.status(400).json({
        messages: {
          title_en: "get tags fail",
          title_th: ""
        }
      });
    }
  },
  toggleActiveTag: async (req, res, next) => {
    try {
      let toggleActiveTag = await db.EventTagModel.findOne({
        where: { id: req.body.id }
      });
      if (!toggleActiveTag) {
        res.status(400).send({ message: "Tag not found" });
      } else {
        toggleActiveTag.update({
          tag_active: req.body.tagActive // หน้าบ้านต้องส่งสถานะมาว่าเป็นtrueหรือfalse
        });
        res.status(200).json({ message: "success" });
      }
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  getTagAndEvent: async (req, res, next) => {
    let tagAndEventResult;
    try {
      tagAndEventResult = await db.EventTagModel.findOne({
        where: { id: req.params.tagId },
        include: [{ model: db.EventModel }]
      });
      return res.status(200).json({
        result: tagAndEventResult,
        messages: { title_en: "get tag and event success", title_th: "" }
      });
    } catch (error) {
      return res
        .status(400)
        .json({ messages: { title_en: "something is wrong", title_th: "" } });
    }
  },
  addTag: async (req, res, next) => {
    try {
      const resultTag = await db.EventTagModel.create({
        tag_name_en: req.body.tagNameEn,
        tag_name_th: req.body.tagNameTh,
        tag_active: true
      });
      res.status(200).json({
        result: resultTag,
        messages: {
          title_en: "add tag success",
          title_th: ""
        }
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        messages: {
          title_en: "add tag fail",
          title_th: ""
        }
      });
    }
  }
};
