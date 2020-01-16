const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class EventCategoryModel extends Model {}
EventCategoryModel.init(
  {
    category_name_en: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: false
      }
    },
    category_name_th: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: false
      }
    }
  },
  { sequelize, modelName: "event_category" }
);

module.exports = { EventCategoryModel };
