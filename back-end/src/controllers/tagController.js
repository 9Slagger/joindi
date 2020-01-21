const db = require("../models");
const _ = require("lodash");

module.exports = {
  getTag: async (req, res, next) => {
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
  }
};
