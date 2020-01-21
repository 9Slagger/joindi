const db = require("../models");

module.exports = {
  createEventHasCategorie: async (req, res, next) => {
    let eventHasCategorieResult;
    try {
      eventHasCategorieResult = await db.EventHasCategoryModel.create({
        event_id: req.body.eventId,
        event_category_id: req.body.eventCategoryId
      });
      res.status(201).json({
        result: eventHasCategorieResult,
        messages: { title_en: "add event to categorie success", title_th: "" }
      });
    } catch (error) {
      console.log("🔴", error);
      res.status(400).json({
        result: eventHasCategorieResult,
        messages: { title_en: "someting is wrong", title_th: "" }
      });
    }
  }
};
