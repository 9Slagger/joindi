const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class UserIndividualDetailModel extends Model {}
UserIndividualDetailModel.init(
  {
    first_name_en: {
      type: DataTypes.STRING,
      allowNull: true
    },
    first_name_th: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name_en: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name_th: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { sequelize, modelName: "user_individual_detail" }
);

module.exports = { UserIndividualDetailModel };
