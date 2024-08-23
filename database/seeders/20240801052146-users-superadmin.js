'use strict';

const { encrypt } = require('../../src/utils/handleBcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password_hashAaron = await encrypt('aaronmejia2222');

    await queryInterface.bulkInsert(
      'SuperAdmins',
      [
        {
          first_name: 'Aaron',
          last_name: 'Mejia',
          email: 'aaronmejia@gmail.com',
          password: password_hashAaron,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SuperAdmins', null, {});
  },
};
