const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class EventStatusModel extends Model {}
EventStatusModel.init(
  {
    status_code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    status_name_en: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    status_name_th: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    }
  },
  { sequelize, modelName: "event_status" }
);

module.exports = { EventStatusModel };
