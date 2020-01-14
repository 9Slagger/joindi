const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class UserCompanyDetailModel extends Model {}
UserCompanyDetailModel.init(
  {
    company_name_en: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    company_name_th: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    company_address_en: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    company_address_th: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    }
  },
  { sequelize, modelName: "user_company_detail" }
);

module.exports = { UserCompanyDetailModel };
