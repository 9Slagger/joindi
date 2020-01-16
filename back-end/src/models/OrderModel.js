const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class OrderModel extends Model {}
OrderModel.init({}, { sequelize, modelName: "order" });

module.exports = { OrderModel };

