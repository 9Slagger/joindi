const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class EventHasCategoryModel extends Model {}
EventHasCategoryModel.init({}, { sequelize, modelName: "event_has_category" });

module.exports = { EventHasCategoryModel };

