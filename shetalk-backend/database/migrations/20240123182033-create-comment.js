"use strict";
/** @type {import('sequelize-cli').Migration} */
const { Post, User } = require("../models/");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
      },
      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: User.tableName,
          key: "id",
        },
        onUpdate: "CASCADE", // Set the onUpdate behavior to CASCADE
        onDelete: "CASCADE", // Set the onDelete behavior to CASCADE
      },
      post_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: Post.tableName,
          key: "id",
        },
        onUpdate: "CASCADE", // Set the onUpdate behavior to CASCADE
        onDelete: "CASCADE", // Set the onDelete behavior to CASCADE
      },
      comment: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("comments");
  },
};
