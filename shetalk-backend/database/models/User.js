"use strict";
require("dotenv").config();
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
      User.hasMany(models.Comment, {
        foreignKey: "user_id",
        as: "comments",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      User.hasMany(models.Post, {
        foreignKey: "user_id",
        as: "posts",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
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
          return this.profile == null
            ? `${process.env.APP_URL}/image/no-profile.png`
            : `${process.env.APP_URL}/image/profiles/${this.profile}`;
        },
      },
      total_answered: {
        type: DataTypes.VIRTUAL,
        get() {
          if (
            this.getDataValue("comments") &&
            this.getDataValue("comments").length
          ) {
            return this.getDataValue("comments").length;
          } else {
            return 0;
          }
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
