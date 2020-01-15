const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class UserCompanyDetailModel extends Model {}
UserCompanyDetailModel.init(
  {
    company_name_en: {
      type: DataTypes.STRING,
      allowNull: true
    },
    company_name_th: {
      type: DataTypes.STRING,
      allowNull: true
    },
    company_address_en: {
      type: DataTypes.STRING,
      allowNull: true
    },
    company_address_th: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  { sequelize, modelName: "user_company_detail" }
);

module.exports = { UserCompanyDetailModel };
