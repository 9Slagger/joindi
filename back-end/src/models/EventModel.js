const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

class EventModel extends Model {}
EventModel.init(
  {
    event_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    event_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    event_latitude_map: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    event_longitude_map: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    event_date_start: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: false
      }
    },
    event_date_end: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: false
      }
    },
    event_content: {
      type: DataTypes.STRING(10000),
      allowNull: false,
      validate: {
        notEmpty: false
      }
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
    },
    event_remark: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false
      }
>>>>>>> 9ffc9b592f5b1de7e8c4da14ad43916d2fc1636d
    },
    event_remark_reject: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false
      }
<<<<<<< HEAD
>>>>>>> 7a8f7a769abf86ddd521a7d618e5bb5b4596e450
=======
>>>>>>> 9ffc9b592f5b1de7e8c4da14ad43916d2fc1636d
    }
  },
  { sequelize, modelName: "event" }
);

module.exports = { EventModel };
