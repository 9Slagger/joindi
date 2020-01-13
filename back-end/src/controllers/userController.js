const db = require("../models");

module.exports = {
  createUser: async (req, res, next) => {
    let userResult, result, status, messages;
    if (!req.body.email) {
      status = 400;
      messages = [];
      messages.push("กรุณากรอกอีเมล");
      return res.status(status).json({ result, messages });
    }
    if (!req.body.password) {
      status = 400;
      messages = [];
      messages.push("กรุณากรอกรหัส");
      return res.status(status).json({ result, messages });
    }
    try {
      userResult = await db.UserModel.create({
        email: req.body.email,
        password: req.body.password,
        phone_number: req.body.phone_number,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      });
      result = userResult;
      status = 201;
      messages = [];
      messages.push("register success");
    } catch (error) {
      console.log(error);
      result = userResult;
      status = 400;
      messages = [];
      messages.push("someting is wrong");
    }
    res.status(status).json({ result, messages });
  }
};
