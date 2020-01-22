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
      type: DataTypes.STRING(14500),
      allowNull: false,
      validate: {
        notEmpty: false
      }
<<<<<<< HEAD
=======
    },
    event_remark_reject: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false
      }
>>>>>>> 7a8f7a769abf86ddd521a7d618e5bb5b4596e450
    }
  },
  { sequelize, modelName: "event" }
);

module.exports = { EventModel };
