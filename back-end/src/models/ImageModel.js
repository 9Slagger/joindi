const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class ImageModel extends Model {}
ImageModel.init(
  {
    file_size: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    filename_extension: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  { sequelize, modelName: "image" }
);

module.exports = { ImageModel };
