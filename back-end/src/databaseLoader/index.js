const db = require("../models");
const _ = require("lodash");
const { hash } = require("../_helper/bcrypt");
const showData = false;

module.exports = async () => {
  if (_.isEmpty(await db.RoleModel.findAll())) {
    const transaction = await db.sequelize.transaction();
    try {
      await db.RoleModel.create(
        { role_code: "01ADM", role_name_en: "Admin", role_name_th: "แอดมิน" },
        { transaction }
      );
      await db.RoleModel.create(
        {
          role_code: "02CUS",
          role_name_en: "Customer",
          role_name_th: "ลูกค้า"
        },
        { transaction }
      );
      await transaction.commit();
      console.log("create RoleModel ✅");
    } catch (error) {
      await transaction.rollback();
      console.log("create RoleModel ❌");
    }
  }
  if (_.isEmpty(await db.CustomerTypeModel.findAll())) {
    const transaction = await db.sequelize.transaction();
    try {
      await db.CustomerTypeModel.create(
        {
          customer_type_code: "01INDV",
          customer_type_name_en: "Individual",
          customer_type_name_th: "บุลคคลธรรมดา"
        },
        { transaction }
      );
      await db.CustomerTypeModel.create(
        {
          customer_type_code: "02CO",
          customer_type_name_en: "Company",
          customer_type_name_th: "นิติบุคคล"
        },
        { transaction }
      );
      await transaction.commit();
      console.log("create CustomerTypeModel ✅");
    } catch (error) {
      await transaction.rollback();
      console.log("create CustomerTypeModel ❌");
    }
  }
  if (_.isEmpty(await db.UserModel.findAll())) {
    const transaction = await db.sequelize.transaction();
    try {
      const userAdminResult = await db.UserModel.create(
        {
          email: "admin1@gmail.com",
          password: hash("12345678"),
          phone_number: "0987654311",
          role_id: 1,
          customer_type_id: 1
        },
        { transaction }
      );
      await db.UserIndividualDetailModel.create(
        {
          first_name: "Akkarapong",
          last_name: "Khamtanet",
          birthday: "1578985914618",
          user_id: userAdminResult.id
        },
        { transaction }
      );
      const userCustomer1Result = await db.UserModel.create(
        {
          email: "customer1@gmail.com",
          password: hash("12345678"),
          phone_number: "0987654312",
          role_id: 2,
          customer_type_id: 1
        },
        { transaction }
      );
      await db.UserIndividualDetailModel.create(
        {
          first_name: "Nutthida",
          last_name: "Yusenas",
          birthday: "1578985914618",
          user_id: userCustomer1Result.id
        },
        { transaction }
      );
      const userCustomer2Result = await db.UserModel.create(
        {
          email: "customer2@gmail.com",
          password: hash("12345678"),
          phone_number: "0987654313",
          role_id: 2,
          customer_type_id: 2
        },
        { transaction }
      );
      await db.UserCompanyDetailModel.create(
        {
          company_name: "Software Park",
          company_address: "Pantip ...",
          user_id: userCustomer2Result.id
        },
        { transaction }
      );
      await transaction.commit();
      console.log("create UserModel ✅");
    } catch (error) {
      await transaction.rollback();
      console.log("create UserModel ❌", error);
    }
  }
  if (showData) {
    try {
      let userResult = await db.UserModel.findAll({
        include: [
          { model: db.RoleModel },
          { model: db.CustomerTypeModel },
          { model: db.UserCompanyDetailModel },
          { model: db.UserIndividualDetailModel }
        ]
      });
      userResult = JSON.parse(JSON.stringify(userResult));
      console.log("✅ ", userResult);
    } catch (error) {
      console.log("❌ ", error);
    }
  }
};
