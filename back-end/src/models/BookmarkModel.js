const { Model } = require("sequelize");
const sequelize = require("../dbconfig");

class BookmarkModel extends Model {}
BookmarkModel.init({}, { sequelize, modelName: "bookmark" });

module.exports = { BookmarkModel };
