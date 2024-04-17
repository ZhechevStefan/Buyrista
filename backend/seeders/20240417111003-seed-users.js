"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        name: "admin admin",
        email: "admin@admin.com",
        password: "123456",
        isAdmin: true
      },
      {
        name: "Charlize Theron",
        email: "test1@test.com",
        password: "123456",
        isAdmin: false
      },
      {
        name: "Scarlett Johanson",
        email: "test2@test.com",
        password: "123456",
        isAdmin: false
      },
      {
        name: "Emma Watson",
        email: "test3@test.com",
        password: "123456",
        isAdmin: false
      },
      {
        name: "Nicole Kidman",
        email: "test4@test.com",
        password: "123456",
        isAdmin: false
      },
      {
        name: "Margot Robbie",
        email: "test5@test.com",
        password: "123456",
        isAdmin: false
      },
      ,
      {
        name: "Eva Green",
        email: "test6@test.com",
        password: "123456",
        isAdmin: false
      },
      {
        name: "Natalie Portman",
        email: "test7@test.com",
        password: "123456",
        isAdmin: false
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
