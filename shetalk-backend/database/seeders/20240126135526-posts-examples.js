"use strict";

const slug = require("slug");
const hashMake = require("../../utils/hash.utils");
const md5 = require("js-md5");

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

    // Sedeer for test posts
    var title = "Title Lorem ipsum dolor sit amet";
    var description =
      "Deskripsi Lorem ipsum, consectetur adipiscing elit. Nulla eget nisl sodales, volutpat neque et, bibendum urna.";
    await queryInterface.bulkInsert(
      "posts",
      [
        {
          title: `${title} - ${1}`,
          slug: slug(`${title} 1`),
          description: description != null ? `${description} - ${1}` : null,
          user_id: 1,
          avatar_id: 1,
          topic_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // Sedeer for user_id not null
    for (let index_1 = 0; index_1 <= 6; index_1++) {
      var title_1 = "Title Lorem ipsum dolor sit amet";
      var description_1 =
        "Deskripsi Lorem ipsum, consectetur adipiscing elit. Nulla eget nisl sodales, volutpat neque et, bibendum urna.";
      if (index_1 >= 3) {
        description_1 = null;
      }
      await queryInterface.bulkInsert(
        "posts",
        [
          {
            title: `${title_1} - ${index_1}`,
            slug: slug(`${title_1} ${md5(hashMake()).substring(0, 6)}`),
            description:
              description_1 != null ? `${description_1} - ${index_1}` : null,
            user_id: 2,
            avatar_id: null,
            topic_id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    }

    // Sedeer for avatar_id not null
    for (let index_2 = 0; index_2 <= 6; index_2++) {
      var title_2 = "Title Lorem ipsum dolor sit amet";
      var description_2 =
        "Deskripsi Lorem ipsum, consectetur adipiscing elit. Nulla eget nisl sodales, volutpat neque et, bibendum urna.";
      if (index_2 >= 3) {
        description_2 = null;
      }
      await queryInterface.bulkInsert(
        "posts",
        [
          {
            title: `${title_2} - ${index_2}`,
            slug: slug(`${title_2} ${md5(hashMake()).substring(0, 6)}`),
            description:
              description_2 != null ? `${description_2} - ${index_2}` : null,
            user_id: null,
            avatar_id: 1,
            topic_id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("posts", null, {});
  },
};
