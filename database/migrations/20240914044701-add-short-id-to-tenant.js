'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      { tableName: 'tenant', schema: 'tenants' },
      'short_id',
      {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      { tableName: 'tenant', schema: 'tenants' },
      'short_id'
    );
  },
};
