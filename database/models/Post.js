"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        as: "user",
      });
      Post.hasMany(models.Comment, {
        foreignKey: "post_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Post.belongsTo(models.Avatar, {
        foreignKey: "avatar_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        as: "avatar",
      });
      Post.belongsTo(models.Topic, {
        foreignKey: "topic_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        as: "topic",
      });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.TEXT("long"),
      user_id: DataTypes.BIGINT.UNSIGNED,
      topic_id: DataTypes.BIGINT.UNSIGNED,
      avatar_id: DataTypes.BIGINT.UNSIGNED,
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
    }
  );
  return Post;
};
