const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_SCHEMA,
  process.env.DATABASE_ID,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_TYPE,
    logging: process.env.NODE_ENV === "development"
  }
);

module.exports = sequelize;
