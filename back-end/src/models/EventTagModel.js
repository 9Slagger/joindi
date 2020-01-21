const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class EventTagModel extends Model {}
EventTagModel.init(
  {
    tag_name_en: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: false
      }
    },
    tag_name_th: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: false
      }
    },
    tag_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  { sequelize, modelName: "event_tag" }
);

module.exports = { EventTagModel };
