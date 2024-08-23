// 'use strict';
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable(
//       'tenants',
//       {
//         id: {
//           allowNull: false,
//           autoIncrement: true,
//           primaryKey: true,
//           type: Sequelize.INTEGER,
//         },
//         schema_name: {
//           type: Sequelize.STRING,
//           allowNull: false,
//         },
//         status: {
//           type: Sequelize.BOOLEAN,
//           allowNull: false,
//           defaultValue: true,
//         },
//         address: {
//           type: Sequelize.STRING,
//         },
//         createdAt: {
//           allowNull: false,
//           type: Sequelize.DATE,
//         },
//         updatedAt: {
//           allowNull: false,
//           type: Sequelize.DATE,
//         },
//       },
//       {
//         schema: 'tenants',
//       }
//     );
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable('tenants', {
//       schema: 'tenants',
//     });
//   },
// };

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS tenants');
    await queryInterface.createTable(
      'tenant',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        schema_name: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
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
