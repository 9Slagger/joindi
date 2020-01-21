const db = require("../models");

module.exports = {
  getCategories: async (req, res, next) => {
    let categoriesResult;
    try {
      categoriesResult = await db.EventCategoryModel.findAll();
      return res.status(200).json({
        result: categoriesResult,
        messages: { title_en: "get categorie success", title_th: "" }
      });
    } catch (error) {
      return res
        .status(400)
        .json({ messages: { title_en: "someting is wrong", title_th: "" } });
    }
  }
};
