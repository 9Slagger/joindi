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
    },
    ticket_remark_reject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    ticket_in_order_status_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: false
      }
    },
  },
  { sequelize, modelName: "ticket_in_order" }
);

module.exports = { TicketInOrderModel };

