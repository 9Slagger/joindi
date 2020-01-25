const db = require("../models");
const _ = require("lodash");
const validate = require("../_helper/validate");
const { compare } = require("../_helper/bcrypt");
const { getToken } = require("../_helper/jwt");

module.exports = {
  signin: async (req, res, next) => {
    //validate

    if (validate(req.body.email)) {
      return res.status(400).json({
        messages: { title_en: "plese specify email", title_th: "" }
      });
    }
    if (validate(req.body.password)) {
      return res.status(400).json({
        messages: { title_en: "plese specify password", title_th: "" }
      });
    }
    //
    let userResult, token;
    try {
      userResult = await db.UserModel.findOne({
        where: { email: req.body.email },
        include: [
          {
            model: db.RoleModel,
            attributes: ["id", "role_code", "role_name_en", "role_name_th"]
          }
        ],
        attributes: ["id", "email", "password"]
      });
      // console.log(userResult.dataValues);

      if (_.isEmpty(JSON.parse(JSON.stringify(userResult)))) {
        console.log("???");

        return res.status(400).json({
          result: { token },
          messages: { title_en: "invalid password", title_th: "" }
        });
      } else {
        // if (compare(req.body.password, userResult.password)) {
        if (1) {
          console.log("signin success");
          userResult.password = "";
          token = getToken(JSON.parse(JSON.stringify(userResult)));
          return res.status(200).json({
            result: { token },
            messages: { title_en: "signin success", title_th: "" }
          });
        } else {
          console.log("invalid password");
          return res.status(400).json({
            result: { token },
            messages: { title_en: "invalid password", title_th: "" }
          });
        }
      }
    } catch (error) {
      console.log("❌", error);
      return res
        .status(400)
        .json({ messages: { title_en: "someting is wrong", title_th: "" } });
    }
  }
};
