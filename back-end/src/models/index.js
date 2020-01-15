const sequelize = require("../dbconfig");
const { UserModel } = require("./UserModel");
const { RoleModel } = require("./RoleModel");
const { CustomerTypeModel } = require("./CustomerTypeModel");
const { UserCompanyDetailModel } = require("./UserCompanyDetailModel");
const { UserIndividualDetailModel } = require("./UserIndividualDetailModel");
const { EventModel } = require("./EventModel");
const { EventStatusModel } = require("./EventStatusModel");
const { OrganizedContactModel } = require("./OrganizedContactModel");
const { EventCategoryModel } = require("./EventCategoryModel");
const { EventHasCategoryModel } = require("./EventHasCategoryModel");
const { EventTagModel } = require("./EventTagModel");
const { EventHasTagModel } = require("./EventHasTagModel");
const { TicketModel } = require("./TicketModel");
const { TicketInOrderModel } = require("./TicketInOrderModel");
const { TicketInOrderStatusModel } = require("./TicketInOrderStatusModel");
const { OrderModel } = require("./OrderModel");

// relation

UserModel.belongsTo(RoleModel, { foreignKey: "role_id" });
RoleModel.hasMany(UserModel, {foreignKey: "role_id"});

UserModel.belongsTo(CustomerTypeModel, { foreignKey: "customer_type_id" });
CustomerTypeModel.hasMany(UserModel, {foreignKey: "customer_type_id"});

UserModel.hasOne(UserCompanyDetailModel, { foreignKey: "user_id" });
UserModel.hasOne(UserIndividualDetailModel, { foreignKey: "user_id" });

EventModel.belongsTo(UserModel, { foreignKey: "user_id" })
UserModel.hasMany(EventModel, { foreignKey: "user_id" })

EventModel.belongsTo(EventStatusModel, { foreignKey: "event_status_id" })
EventStatusModel.hasMany(EventModel, { foreignKey: "event_status_id" })

OrganizedContactModel.belongsTo(EventModel, { foreignKey: "event_id" })
EventModel.hasMany(OrganizedContactModel, { foreignKey: "event_id" })

EventModel.belongsToMany(EventCategoryModel, { through: EventHasCategoryModel, foreignKey: "event_id" })
EventCategoryModel.belongsToMany(EventModel, { through: EventHasCategoryModel, foreignKey: "event_category_id" })

EventModel.belongsToMany(EventTagModel, { through: EventHasTagModel, foreignKey: "event_id" })
EventTagModel.belongsToMany(EventModel, { through: EventHasTagModel, foreignKey: "event_tag_id" })

TicketModel.belongsTo(EventModel, { foreignKey: "event_id" })
EventModel.hasMany(TicketModel, { foreignKey: "event_id" })

TicketInOrderModel.belongsTo(TicketModel, { foreignKey: "ticket_id" })
TicketModel.hasMany(TicketInOrderModel, { foreignKey: "ticket_id"})

TicketInOrderModel.belongsTo(TicketInOrderStatusModel, { foreignKey: "ticket_in_order_status_id" })
TicketInOrderStatusModel.hasMany(TicketInOrderModel, { foreignKey: "ticket_in_order_status_id"})

TicketInOrderModel.belongsTo(OrderModel, { foreignKey: "order_id" })
OrderModel.hasMany(TicketInOrderModel, { foreignKey: "order_id"})

UserModel.hasOne(OrderModel, { foreignKey: "user_id" })
OrderModel.belongsTo(UserModel, { foreignKey: "user_id"})

module.exports = {
  sequelize,
  UserModel,
  RoleModel,
  CustomerTypeModel,
  UserCompanyDetailModel,
  UserIndividualDetailModel,
  EventModel,
  EventStatusModel,
  OrganizedContactModel,
  EventCategoryModel,
  EventHasCategoryModel,
  EventTagModel,
  EventHasTagModel,
  TicketModel,
  TicketInOrderModel,
  TicketInOrderStatusModel,
  OrderModel
};
