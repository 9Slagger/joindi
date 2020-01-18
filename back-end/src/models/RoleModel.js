const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class RoleModel extends Model {}
RoleModel.init(
  {
    role_code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    role_name_en: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    role_name_th: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    }
  },
  { sequelize, modelName: "role" }
);

module.exports = { RoleModel };
