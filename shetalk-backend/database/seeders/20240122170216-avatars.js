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
      "avatars",
      [
        {
          avatar_img: "dayang-sumbi.jpg",
          avatar_name: "Dayang sumbi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          avatar_img: "keong-mas.png",
          avatar_name: "Keong mas",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          avatar_img: "nawang-wulan.jpg",
          avatar_name: "Nawang wulan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          avatar_img: "roro-jonggrang.jpg",
          avatar_name: "Roro jonggrang",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          avatar_img: "timun-mas.jpg",
          avatar_name: "Timun mas",
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
    await queryInterface.bulkDelete("avatars", null, {});
  },
};
