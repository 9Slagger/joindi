const db = require("../models");

module.exports = {
  getRole: async (req, res, next) => {
    let roleResult;
    try {
      roleResult = await db.RoleModel.findAll({
        attributes: ["id", "role_code", "role_name_en", "role_name_th"]
      });
      return res.status(200).json({
        result: roleResult,
        messages: { title_en: "get role success", title_th: "" }
      });
    } catch (error) {
      return res
        .status(400)
        .json({ messages: { title_en: "someting is wrong", title_th: "" } });
    }
  }
};
