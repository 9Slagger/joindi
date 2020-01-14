const sequelize = require("../dbconfig");
const { UserModel } = require("./UserModel");
const { RoleModel } = require("./RoleModel");
const { CustomerTypeModel } = require("./CustomerTypeModel");
const { UserCompanyDetailModel } = require("./UserCompanyDetailModel");
const { UserIndividualDetailModel } = require("./UserIndividualDetailModel");

// relation

UserModel.belongsTo(RoleModel, { foreignKey: "role_id" });
RoleModel.hasOne(UserModel, {foreignKey: "role_id"});

UserModel.belongsTo(CustomerTypeModel, { foreignKey: "customer_type_id" });
CustomerTypeModel.hasOne(UserModel, {foreignKey: "customer_type_id"});

UserModel.hasOne(UserCompanyDetailModel, { foreignKey: "user_id" });
UserModel.hasOne(UserIndividualDetailModel, { foreignKey: "user_id" });

module.exports = {
  sequelize,
  UserModel,
  RoleModel,
  CustomerTypeModel,
  UserCompanyDetailModel,
  UserIndividualDetailModel
};
