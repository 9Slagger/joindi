const db = require("../models");
const _ = require("lodash");
const validate = require("../_helper/validate");
const { hash } = require("../_helper/bcrypt");

module.exports = {
  createUser: async (req, res, next) => {
    // validate
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
    if (validate(req.body.phoneNumber)) {
      return res.status(400).json({
        messages: { title_en: "plese specify phone number", title_th: "" }
      });
    }
    if (validate(req.body.customerTypeId)) {
      return res.status(400).json({
        messages: { title_en: "plese specify customer type", title_th: "" }
      });
    }
    //
    let userResult, roleResult, customerTypeResult, transaction;
    try {
      roleResult = await db.RoleModel.findOne({
        where: { role_code: "02CUS" }
      });
      if (_.isEmpty(roleResult)) {
        return res.status(400).json({
          messages: {
            title_en: "someting is wrong",
            title_th: "มีบางอย่างผิดพลาด"
          }
        });
      }
    } catch (error) {
      console.log("❌", error);
      return res.status(400).json({
        messages: {
          title_en: "someting is wrong",
          title_th: "มีบางอย่างผิดพลาด"
        }
      });
    }
    try {
      customerTypeResult = await db.CustomerTypeModel.findOne({
        where: { id: req.body.customerTypeId }
      });
    } catch (error) {
      console.log("❌", error);
      return res.status(400).json({
        messages: {
          title_en: "someting is wrong",
          title_th: "มีบางอย่างผิดพลาด"
        }
      });
    }
    try {
      transaction = await db.sequelize.transaction();
    } catch (error) {
      console.log("❌", error);
      return res.status(400).json({
        messages: {
          title_en: "someting is wrong",
          title_th: "มีบางอย่างผิดพลาด"
        }
      });
    }
    try {
      userResult = await db.UserModel.create(
        {
          email: req.body.email,
          password: hash(req.body.password),
          phone_number: req.body.phoneNumber,
          role_id: roleResult.id,
          customer_type_id: customerTypeResult.id,
          user_active: true
        },
        { transaction }
      );
      if (customerTypeResult.customer_type_code === "01INDV") {
        if (validate(req.body.firstName)) {
          return res.status(400).json({
            messages: {
              title_en: "plese specify first name",
              title_th: ""
            }
          });
        }
        if (validate(req.body.lastName)) {
          return res.status(400).json({
            messages: {
              title_en: "plese specify birthday",
              title_th: ""
            }
          });
        }
        try {
          await db.UserIndividualDetailModel.create(
            {
              first_name: req.body.firstName,
              last_name: req.body.lastName,
              birthday: req.body.birthday || null,
              user_id: userResult.id
            },
            { transaction }
          );
        } catch (error) {
          console.log("❌", error);
          return res.status(400).json({
            messages: {
              title_en: "someting is wrong",
              title_th: "มีบางอย่างผิดพลาด"
            }
          });
        }
      } else if (customerTypeResult.customer_type_code === "02CO") {
        if (validate(req.body.companyName)) {
          return res.status(400).json({
            messages: {
              title_en: "plese specify company name",
              title_th: ""
            }
          });
        }
        try {
          await db.UserCompanyDetailModel.create(
            {
              company_name: req.body.companyName,
              company_address: req.body.companyAddress || null,
              user_id: userResult.id
            },
            { transaction }
          );
        } catch (error) {
          console.log("❌", error);
          return res.status(400).json({
            messages: {
              title_en: "someting is wrong",
              title_th: "มีบางอย่างผิดพลาด"
            }
          });
        }
      }
      await transaction.commit();
      return res.status(201).json({
        result: userResult,
        messages: {
          title_en: "signup success",
          title_th: "สมัครสมาชิกสำเร็จ"
        }
      });
    } catch (error) {
      if(error.original.errno === 1062) {
        return res.status(400).json({
          messages: {
            title_en: error.original.message,
            title_th: error.original.message
          }
        });
      }
      // console.log("❌", error);
      await transaction.rollback();
      return res.status(400).json({
        messages: {
          title_en: "someting is wrong",
          title_th: "มีบางอย่างผิดพลาด"
        }
      });
    }
  },
  toggleActiveUser: async (req, res, next) => {
    try {
      let toggleActiveUser = await db.UserModel.findOne({
        where: { id: req.body.id }
      });
      if (!toggleActiveUser) {
        res.status(400).send({ message: "User not found" });
      } else {
        toggleActiveUser.update({
          user_active: req.body.userActive // หน้าบ้านต้องส่งสถานะมาว่าเป็นtrueหรือfalse
        });
        res.status(200).json({ message: "success" });
      }
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
};
