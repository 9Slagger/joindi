const { Model } = require("sequelize");
const sequelize = require("../dbconfig");

class EventHasImageModel extends Model {}
EventHasImageModel.init({}, { sequelize, modelName: "event_has_image" });

module.exports = { EventHasImageModel };
