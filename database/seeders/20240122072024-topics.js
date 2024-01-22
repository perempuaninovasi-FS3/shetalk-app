"use strict";

const slug = require("slug");
slug.charmap["/"] = "-";
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
      "topics",
      [
        {
          name: "Semua Topik",
          slug: slug("Semua Topik"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Menstruation",
          slug: slug("Menstruation"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HIV/AIDS",
          slug: slug("HIV/AIDS"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Teenage pregnancy",
          slug: slug("Teenage pregnancy"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sexual orientation",
          slug: slug("Sexual orientation"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Contraception",
          slug: slug("Contraception"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Child Sexual Abuse",
          slug: slug("Child Sexual Abuse"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pregnancy",
          slug: slug("Pregnancy"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sexual behaviour",
          slug: slug("Sexual behaviour"),
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
    await queryInterface.bulkDelete("topics", null, {});
  },
};
