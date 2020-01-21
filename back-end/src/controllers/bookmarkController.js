const db = require("../models");
const _ = require("lodash");
const { Op } = require("sequelize");

module.exports = {
  createBookmark: async (req, res, next) => {
    try {
      let user_has_bookmark = [];
      console.log("🈴",req.body.bookmarkList)
      req.body.bookmarkList.map(event_id => {
        user_has_bookmark.push({
          event_id: event_id,
          user_id: req.user.id
        });
      });
      resultHasBookmark = await db.BookmarkModel.bulkCreate(user_has_bookmark);
      res.status(200).send(resultHasBookmark);
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: error.message });
    }
  }
};
