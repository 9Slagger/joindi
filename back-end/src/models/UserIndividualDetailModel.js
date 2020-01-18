const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class UserIndividualDetailModel extends Model {}
UserIndividualDetailModel.init(
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    }
  },
  { sequelize, modelName: "user_individual_detail" }
);

module.exports = { UserIndividualDetailModel };

