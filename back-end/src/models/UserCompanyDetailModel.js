const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class UserCompanyDetailModel extends Model {}
UserCompanyDetailModel.init(
  {
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    company_address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
  },
  { sequelize, modelName: "user_company_detail" }
);

module.exports = { UserCompanyDetailModel };
