const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class UserIndividualDetailModel extends Model {}
UserIndividualDetailModel.init(
  {
    first_name_en: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    first_name_th: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    last_name_en: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    last_name_th: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: false
      }
    },
  },
  { sequelize, modelName: "user_individual_detail" }
);

module.exports = { UserIndividualDetailModel };
