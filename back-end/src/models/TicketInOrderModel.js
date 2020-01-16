const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class TicketInOrderModel extends Model {}
TicketInOrderModel.init(
  {
    ticket_quantity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    }
  },
  { sequelize, modelName: "ticket_in_order" }
);

module.exports = { TicketInOrderModel };

