const db = require("../models");
const _ = require("lodash");
const validate = require("../_helper/validate");
const { hash } = require("../_helper/bcrypt");

module.exports = {
  createUser: async (req, res, next) => {
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
          customer_type_id: customerTypeResult.id
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
        if (
          validate(req.body.companyName)
        ) {
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
      console.log("❌", error);
      await transaction.rollback();
      return res.status(400).json({
        messages: {
          title_en: "someting is wrong",
          title_th: "มีบางอย่างผิดพลาด"
        }
      });
    }
  }
};
