const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class TicketInOrderStatusModel extends Model {}
TicketInOrderStatusModel.init(
  {
    status_code: {
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
    },
    status_name_en: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
  },
  { sequelize, modelName: "ticket_in_order_status" }
);

module.exports = { TicketInOrderStatusModel };

