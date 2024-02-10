"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Avatar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Avatar.init(
    {
      avatar_img: DataTypes.STRING,
      avatar_name: DataTypes.STRING,
      avatar_url: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${process.env.APP_URL}/image/avatars/${this.avatar_img}`;
        },
      },
    },
    {
      sequelize,
      modelName: "Avatar",
      tableName: "avatars",
    }
  );
  return Avatar;
};
