"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "comments",
      [
        {
          user_id: 1,
          post_id: 1,
          comment: "Boleh juga post 1.",
          createdAt: new Date(),
        },
        {
          user_id: 2,
          post_id: 1,
          comment: "Boleh juga post 1..",
          createdAt: new Date(),
        },
        {
          user_id: 1,
          post_id: 2,
          comment: "Boleh juga post 2.",
          createdAt: new Date(),
        },
        {
          user_id: 2,
          post_id: 2,
          comment: "Boleh juga post 2..",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("comments", null, {});
  },
};
