require("dotenv").config();
const fs = require("fs");
// const process = require("process");

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALEG,
    timezone: process.env.TIMEZONE,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: process.env.CI_DB_HOST,
    port: process.env.CI_DB_PORT,
    dialect: process.env.CI_DB_DIALEG,
    timezone: process.env.CI_TIMEZONE,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  // production: {
  //   use_env_variable: "MYSQL_URL",
  //   dialect: "mysql",
  // },
};
