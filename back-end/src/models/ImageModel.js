const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class ImageModel extends Model {}
ImageModel.init(
  {
    file_size: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: false
      }
    },
    filename_extension: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: false
      }
    }
  },
  { sequelize, modelName: "image" }
);

module.exports = { ImageModel };
