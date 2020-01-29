const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class OrganizedContactModel extends Model {}
OrganizedContactModel.init(
  {
    organized_contact_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    organized_contact: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    }
  },
  { sequelize, modelName: "organized_contact" }
);

module.exports = { OrganizedContactModel };
