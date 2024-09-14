'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS tenants');
    await queryInterface.createTable(
      'tenant',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },

        schema_name: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },

        address: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        status: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        schema: 'tenants',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({ tableName: 'tenant', schema: 'tenants' });
    await queryInterface.sequelize.query('DROP SCHEMA IF EXISTS tenants');
  },
};
