const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class CustomerTypeModel extends Model {}
CustomerTypeModel.init(
  {
    customer_type_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: false
      }
    },
    customer_type_name_en: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: false
      }
    },
    customer_type_name_th: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: false
      }
    }
  },
  { sequelize, modelName: "customer_type" }
);

module.exports = { CustomerTypeModel };

