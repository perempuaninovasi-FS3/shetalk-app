"use strict";
/** @type {import('sequelize-cli').Migration} */
const { Topic, User, Avatar } = require("../models/");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: User.tableName,
          key: "id",
        },
        onUpdate: "CASCADE", // Set the onUpdate behavior to CASCADE
        onDelete: "CASCADE", // Set the onDelete behavior to CASCADE
      },
      avatar_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: Avatar.tableName,
          key: "id",
        },
        onUpdate: "CASCADE", // Set the onUpdate behavior to CASCADE
        onDelete: "CASCADE", // Set the onDelete behavior to CASCADE
      },
      topic_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: Topic.tableName,
          key: "id",
        },
        onUpdate: "CASCADE", // Set the onUpdate behavior to CASCADE
        onDelete: "CASCADE", // Set the onDelete behavior to CASCADE
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("posts");
  },
};
