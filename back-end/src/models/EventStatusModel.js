const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class EventStatusModel extends Model {}
EventStatusModel.init(
  {
    status_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: false
      }
    },
    status_name_en: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: false
      }
    },
    status_name_th: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: false
      }
    },
    tag_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  { sequelize, modelName: "event_status" }
);

module.exports = { EventStatusModel };
