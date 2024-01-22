"use strict";
require('dotenv').config();
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      sertifikat: DataTypes.JSON,
      role: DataTypes.STRING,
      token: DataTypes.STRING,
      profile: DataTypes.STRING,
      profiles: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.profile == null?`${process.env.APP_URL}/image/no-profile.png`:`${process.env.APP_URL}/image/${this.profile}`
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
