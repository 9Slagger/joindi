const db = require("../models");

module.exports = {
  getCustomerType: async (req, res, next) => {
    let roleResult;
    try {
      roleResult = await db.CustomerTypeModel.findAll({
        attributes: ["id", "customer_type_code", "customer_type_name_en", "customer_type_name_th"]
      });
      return res
        .status(200)
        .json({
          result: roleResult,
          messages: { title_en: "get customer type success", title_th: "" }
        });
    } catch (error) {
      return res
        .status(400)
        .json({ messages: { title_en: "someting is wrong", title_th: "" } });
    }
  }
};
