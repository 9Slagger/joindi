const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class RoleModel extends Model {}
RoleModel.init(
  {
    role_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: false
      }
    },
    role_name_en: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: false
      }
    },
    role_name_th: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: false
      }
    }
  },
  { sequelize, modelName: "role" }
);

module.exports = { RoleModel };
