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
<<<<<<< HEAD
    ticket_remark_reject: {
=======
    ticket_in_order_remark_reject: {
>>>>>>> 082dc299fb89e78557f9175ffc7df381d4d4b0c2
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
<<<<<<< HEAD
    },  
=======
    },
    ticket_in_order_status_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    }
>>>>>>> 082dc299fb89e78557f9175ffc7df381d4d4b0c2
  },
  { sequelize, modelName: "ticket_in_order" }
);

module.exports = { TicketInOrderModel };

