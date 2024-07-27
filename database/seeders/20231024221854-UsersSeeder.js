const { encrypt } = require('../../src/utils/handleBcrypt');

('use strict');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHashOne = await encrypt('aaronmejia2222');
    const passwordHashTwo = await encrypt('12345');
    const passwordHashThree = await encrypt('kendy22##');

    await queryInterface.bulkInsert('users', [
      {
        name: 'Aaron Mejia',
        email: 'aaronmejia168@gmail.com',
        password: passwordHashOne,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Romario Ariza',
        email: 'romario122@gmail.com',
        password: passwordHashTwo,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kendy Elisca',
        email: 'kendyelisca5@gmail.com',
        password: passwordHashThree,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
