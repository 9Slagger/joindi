const sequelize = require("../dbconfig");
const { UserModel } = require("./UserModel");
// const { RoleModel } = require("./UserModel");

// relation

// UserModel.hasOne(RoleModel);

module.exports = {
  UserModel,
  sequelize
};
