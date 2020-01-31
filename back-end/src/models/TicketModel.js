const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class TicketModel extends Model {}
TicketModel.init(
  {
    ticket_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    ticket_detail: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    ticket_note: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    ticket_total_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    ticket_remaining_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    ticket_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    ticket_manufacturing_date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    ticket_expiry_date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    }
  },
  { sequelize, modelName: "ticket" }
);

module.exports = { TicketModel };
