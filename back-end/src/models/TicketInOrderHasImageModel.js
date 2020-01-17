const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class TicketInOrderHasImageModel extends Model {}
TicketInOrderHasImageModel.init({}, { sequelize, modelName: "ticket_in_order_has_image" });

module.exports = { TicketInOrderHasImageModel };
