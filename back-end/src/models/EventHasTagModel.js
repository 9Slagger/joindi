const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class EventHasTagModel extends Model {}
EventHasTagModel.init({}, { sequelize, modelName: "event_has_tag" });

module.exports = { EventHasTagModel };
