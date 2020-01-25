const db = require("../models");
const _ = require("lodash");
// const { Op } = require("sequelize");

module.exports = {
  createBookmark: async (req, res, next) => {
    let targetBookmark;
    try {
      targetBookmark = await db.BookmarkModel.findOne({
        where: { event_id: req.body.event_id, user_id: req.user.id }
      });
    } catch (error) {
      return res.status(400).json({
        messages: { title_en: "someting is wrong", title_th: "" }
      });
    }
    if (!_.isEmpty(targetBookmark)) {
      try {
        await targetBookmark.destroy();
        res.status(200).json({
          messages: { title_en: "unbookmark event success", title_th: "" }
        });
      } catch (error) {
        return res.status(400).json({
          messages: { title_en: "someting is wrong", title_th: "" }
        });
      }
    } else {
      try {
        await db.BookmarkModel.create({
          event_id: req.body.event_id,
          user_id: req.user.id
        });
        res.status(200).json({
          messages: { title_en: "bookmark event success", title_th: "" }
        });
      } catch (error) {
        res.status(400).json({
          result: resultHasBookmark,
          messages: { title_en: "someting is wrong", title_th: "" }
        });
      }
    }
  }
};
